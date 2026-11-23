import React from 'react';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import { renderWithRouter } from '../utils';

describe('ProgressBar', () => {
	it('shows the step from the URL', () => {
		const { getByLabelText } = renderWithRouter(<ProgressBar />, {
			route: '/onboarding/step-4b',
		});
		expect(getByLabelText('Onboarding progress')).toHaveAttribute(
			'value',
			'4',
		);
	});

	it("doesn't crash on a URL without a step", () => {
		const { getByLabelText } = renderWithRouter(<ProgressBar />, {
			route: '/onboarding',
		});
		expect(getByLabelText('Onboarding progress')).toHaveAttribute(
			'value',
			'0',
		);
	});
});
