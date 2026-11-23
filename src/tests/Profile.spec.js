import React from 'react';
import mockAxios from 'axios';
import { Profile } from '../components/Profile';
import { renderWithRouterAndRedux } from './utils';

const peer = {
	id: 1,
	first_name: 'Test',
	last_name: 'User',
	rec: [
		{
			id: 20,
			recipient: 7,
			sender: 1,
			message: 'Hayyyy',
			date: '2019-12-31T00:00:00.000Z',
			badge_id: 1,
			first_name: 'Bruce',
			last_name: 'Banner',
			profile_pic: 'https://fake.image',
		},
		{
			id: 21,
			recipient: 1,
			sender: 7,
			message: 'Back at you',
			date: '2020-01-01T00:00:00.000Z',
			badge_id: 1,
			first_name: 'Bruce',
			last_name: 'Banner',
			profile_pic: 'https://fake.image',
		},
	],
};

describe('<Profile />', () => {
	beforeEach(() => {
		mockAxios.get.mockImplementation((url) => {
			if (url === '/profile/1')
				return Promise.resolve({ data: { peer } });
			if (url === '/badges') {
				return Promise.resolve({
					data: [{ id: 1, badge_URL: 'https://fake.badge' }],
				});
			}
			return Promise.resolve({ data: {} });
		});
	});

	it('shows sent and received recognitions from the user’s side', async () => {
		const { findByText, getByText } = renderWithRouterAndRedux(<Profile />);
		expect(await findByText('Hayyyy')).toBeInTheDocument();
		expect(getByText('Sent to', { exact: false })).toBeInTheDocument();
		expect(getByText('From', { exact: false })).toBeInTheDocument();
	});

	it('counts only badges the user received', async () => {
		const { findByText } = renderWithRouterAndRedux(<Profile />);
		expect(await findByText('My badges')).toBeInTheDocument();
		expect(
			(await findByText('My badges')).parentElement.querySelector('h2'),
		).toHaveTextContent('1');
	});
});
