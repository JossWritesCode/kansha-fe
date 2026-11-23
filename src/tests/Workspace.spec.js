import React from 'react';
import { wait, fireEvent } from '@testing-library/react';
import mockAxios from 'axios';
import Workspace from '../components/Workspace';
import { renderWithRouterAndRedux } from './utils';

const employee = {
	id: 4,
	first_name: 'Test',
	last_name: 'Person',
	profile_picture: 'https://fake.image',
	job_title: 'CEO',
	user_type: 'admin',
	org_name: "Kevin's Funhouse",
};

describe('Workspace', () => {
	beforeEach(() => {
		mockAxios.get.mockImplementation((url) =>
			Promise.resolve({
				data: url.startsWith('/employees')
					? { count: 1, employees: [employee] }
					: [],
			}),
		);
	});

	it('lists the organization’s employees', async () => {
		const { findByText } = renderWithRouterAndRedux(<Workspace />);
		expect(await findByText('Test Person')).toBeInTheDocument();
	});

	it('searches once typing pauses', async () => {
		const { getByLabelText, findByText } = renderWithRouterAndRedux(
			<Workspace />,
		);
		await findByText('Test Person');
		mockAxios.get.mockClear();

		const input = getByLabelText('Search Workspace');
		fireEvent.change(input, { target: { value: 'Te' } });
		fireEvent.change(input, { target: { value: 'Test' } });

		await wait(() =>
			expect(mockAxios.get).toHaveBeenCalledWith(
				expect.stringContaining(
					'/employees/organizations?search=Test&',
				),
			),
		);
		const searches = mockAxios.get.mock.calls.filter(([url]) =>
			url.startsWith('/employees'),
		);
		expect(searches).toHaveLength(1);
	});
});
