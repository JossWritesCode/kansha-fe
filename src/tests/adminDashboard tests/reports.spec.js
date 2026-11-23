import React from 'react';
import { wait } from '@testing-library/react';
import ReportsPage from '../../components/AdminDashboard/AdminDashboard';
import { renderWithRouterAndRedux } from '../utils';
import mockAxios from 'axios';

// Chart.js can't draw in jsdom; these tests cover the data around the charts
jest.mock('react-chartjs-2', () => ({
	Line: () => null,
	Doughnut: () => null,
}));

describe('Reports', () => {
	beforeEach(() => {
		mockAxios.get.mockImplementation((url) => {
			switch (url) {
				case '/reports/range?time=weeks':
					return Promise.resolve({
						data: {
							count: 5,
							results: {
								Saturday: 0,
								Friday: 0,
								Thursday: 0,
								Wednesday: 0,
								Tuesday: 0,
								Monday: 5,
								Sunday: 0,
							},
						},
					});
				case '/reports/top?type=sender&limit=5&time=weeks':
					return Promise.resolve({
						data: {
							count: 5,
							employees: [
								{
									first_name: 'Kevin',
									last_name: 'Smith',
									sender: 4,
									profile_picture:
										'https://lh3.googleusercontent.com/a-/AOh14GhcGzXoKjtH51pnoKbaUvz5ml2bDBvSduG-bhYL-Q',
									count: '5',
								},
							],
						},
					});
				case '/reports/top?type=recipient&limit=5&time=weeks':
					return Promise.resolve({
						data: {
							count: 5,
							employees: [
								{
									first_name: 'Thor',
									last_name: 'Odinson',
									recipient: 6,
									profile_picture:
										'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
									count: '2',
								},
							],
						},
					});
				default:
					return Promise.resolve({ data: {} });
			}
		});
	});
	it('displays header text', async () => {
		const { getByText, getAllByText, findByText } =
			renderWithRouterAndRedux(<ReportsPage />);
		getByText(/Overview/i);
		getAllByText(/Recognition/i);
		getAllByText(/Participation/i);
		getByText(/Most Thanked/i);
		getByText(/Most Thankful/i);
		// let the reports finish loading before the test ends
		await findByText('Kevin S');
	});

	it('shows the leaderboards once loaded', async () => {
		const { findByText } = renderWithRouterAndRedux(<ReportsPage />);
		expect(await findByText('Kevin S')).toBeInTheDocument();
		expect(await findByText('Thor O')).toBeInTheDocument();
	});

	it('shows a dash, not NaN, while participation is unknown', async () => {
		const { getAllByText, queryByText } = renderWithRouterAndRedux(
			<ReportsPage />,
		);
		await wait(() =>
			expect(getAllByText(/— Participation/)).toHaveLength(2),
		);
		expect(queryByText(/NaN/)).toBeNull();
	});
});
