import React from 'react';
import { fireEvent } from '@testing-library/react';
import SideBar from '../../components/SideBar';
import { renderWithRouterAndRedux, testAdminUser } from '../utils';

describe('SideBar', () => {
	it('should expand when hamburger clicked', () => {
		const { container } = renderWithRouterAndRedux(<SideBar />);
		const sidebar = container.querySelector('.side-nav');
		expect(sidebar).not.toHaveClass('is-open');
		fireEvent.click(container.querySelector('.hamburger'));
		expect(sidebar).toHaveClass('is-open');
	});

	it('should go to settings when the settings link is clicked', () => {
		const { getByTitle, history } = renderWithRouterAndRedux(<SideBar />);
		fireEvent.click(getByTitle('Settings'));
		expect(history.location.pathname).toBe('/settings');
	});

	it('should only show the Teams link to admins', () => {
		const { queryByTitle } = renderWithRouterAndRedux(<SideBar />);
		expect(queryByTitle('Teams')).toBeNull();

		const admin = renderWithRouterAndRedux(<SideBar />, {
			store: testAdminUser(),
		});
		fireEvent.click(admin.getByTitle('Teams'));
		expect(admin.history.location.pathname).toBe('/organization');
	});
});
