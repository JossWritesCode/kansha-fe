import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { useEmployeeSearch } from '../hooks/useEmployeeSearch';

// Sorted by first name, as the API returns them
const DIRECTORY = ['Ann', 'Ben', 'Cat', 'Dan', 'Eve'].map((first_name, i) => ({
	id: i + 1,
	first_name,
}));
const ZED = { id: 9, first_name: 'Zed' };
const PAGE_SIZE = 2;

const params = (url) => new URLSearchParams(url.split('?')[1]);

// Serves the directory a page at a time; a search for "Zed" finds one person
const respond = (url) => {
	const query = params(url);
	const page = Number(query.get('page'));
	const matches = query.get('search') === 'Zed' ? [ZED] : DIRECTORY;
	const start = (page - 1) * PAGE_SIZE;
	return Promise.resolve({
		data: {
			count: DIRECTORY.length,
			employees: matches.slice(start, start + PAGE_SIZE),
		},
	});
};

const Directory = ({ search }) => {
	const { employees, hasMore, loadMore, isLoading, error } =
		useEmployeeSearch(search, { limit: PAGE_SIZE });
	return (
		<div>
			<ul>
				{employees.map((emp) => (
					<li key={emp.id}>{emp.first_name}</li>
				))}
			</ul>
			{hasMore && (
				<button onClick={loadMore} disabled={isLoading}>
					Show more
				</button>
			)}
			{error && <p>Load failed</p>}
		</div>
	);
};

const names = (container) =>
	[...container.querySelectorAll('li')].map((li) => li.textContent);

const requestedPages = () =>
	mockAxios.get.mock.calls.map(([url]) => Number(params(url).get('page')));

describe('useEmployeeSearch', () => {
	beforeEach(() => {
		mockAxios.get.mockImplementation(respond);
	});

	it('starts again from page 1 when the search is cleared', async () => {
		const { container, getByText, rerender } = render(
			<Directory search="" />,
		);
		await wait(() => expect(names(container)).toEqual(['Ann', 'Ben']));

		fireEvent.click(getByText('Show more'));
		await wait(() =>
			expect(names(container)).toEqual(['Ann', 'Ben', 'Cat', 'Dan']),
		);

		rerender(<Directory search="Zed" />);
		await wait(() => expect(names(container)).toEqual(['Zed']));

		rerender(<Directory search="" />);
		await wait(() => expect(names(container)).toEqual(['Ann', 'Ben']));
		expect(requestedPages().slice(-1)).toEqual([1]);
	});

	it('retries the same page after Show more fails', async () => {
		const { container, getByText, findByText } = render(
			<Directory search="" />,
		);
		await wait(() => expect(names(container)).toEqual(['Ann', 'Ben']));

		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject(new Error('Network Error')),
		);
		fireEvent.click(getByText('Show more'));
		await findByText('Load failed');
		expect(names(container)).toEqual(['Ann', 'Ben']);

		fireEvent.click(getByText('Show more'));
		await wait(() =>
			expect(names(container)).toEqual(['Ann', 'Ben', 'Cat', 'Dan']),
		);
		expect(requestedPages()).toEqual([1, 2, 2]);
	});
});
