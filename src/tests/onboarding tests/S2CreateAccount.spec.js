import React from 'react';
import 'mutationobserver-shim';
import S2CreateAccount from '../../components/Onboarding/S2CreateAccount';
import { renderWithRouter } from '../utils';

const user = {
	first_name: '',
	last_name: '',
	job_title: '',
	org_name: '',
	industry: '',
	company_size: '',
};

describe('S2: create account', () => {
	it('asks for the organization size', () => {
		const { getByText } = renderWithRouter(
			<S2CreateAccount
				user={user}
				setUser={() => {}}
				handleUser={() => {}}
			/>,
		);
		getByText(/How big is your organization?/i);
		getByText(/less than 20/i);
		getByText(/21 - 100/i);
		getByText(/over 100/i);
	});

	it('keeps Next disabled until the form is filled in', () => {
		const { getByText } = renderWithRouter(
			<S2CreateAccount
				user={user}
				setUser={() => {}}
				handleUser={() => {}}
			/>,
		);
		expect(getByText('Next')).toBeDisabled();
	});
});
