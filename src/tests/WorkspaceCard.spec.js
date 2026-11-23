import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { renderWithRouterAndRedux } from './utils';
import WorkspaceCard from '../components/Workspace/WorkspaceCard';

const profile = {
	id: 1,
	first_name: 'Test',
	last_name: 'User',
	profile_picture: 'http://fake.image',
};

describe('Workspace Card', () => {
	it('shows the employee’s avatar', () => {
		const { getByAltText } = renderWithRouterAndRedux(
			<WorkspaceCard profile={profile} setTeam={() => {}} />,
		);
		expect(getByAltText('profile')).toBeInTheDocument();
	});

	it('opens the recognition modal from the send button', async () => {
		const { getByLabelText, findByLabelText } = renderWithRouterAndRedux(
			<WorkspaceCard profile={profile} setTeam={() => {}} />,
		);
		fireEvent.click(getByLabelText('Send Test User a recognition'));
		expect(
			await findByLabelText('Type your message here'),
		).toBeInTheDocument();
	});

	it('opens the profile modal from the profile button', async () => {
		const { getByLabelText, container, history } = renderWithRouterAndRedux(
			<WorkspaceCard profile={profile} setTeam={() => {}} />,
		);
		fireEvent.click(getByLabelText("View Test User's profile"));
		await wait(() =>
			expect(
				container.querySelector('.profile-modal'),
			).toBeInTheDocument(),
		);
		expect(history.location.pathname).toBe('/');
	});
});
