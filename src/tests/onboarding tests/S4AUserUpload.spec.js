import React from 'react';
import { fireEvent } from '@testing-library/react';
import S4AUserUpload from '../../components/Onboarding/S4AUserUpload';
import { renderWithRouter } from '../utils';

describe('S4A: add employees now?', () => {
	it('asks whether to add employees now', () => {
		const { getByText } = renderWithRouter(<S4AUserUpload />);
		getByText(/Would you like to add employees now?/i);
	});

	it('skips to the last step when the answer is no', () => {
		const { getByLabelText, getByText, history } = renderWithRouter(
			<S4AUserUpload />,
		);
		fireEvent.click(getByLabelText('No'));
		fireEvent.click(getByText('Next'));
		expect(history.location.pathname).toBe('/onboarding/step-6');
	});

	it('goes to manual entry when chosen', () => {
		const { getByLabelText, getByText, history } = renderWithRouter(
			<S4AUserUpload />,
		);
		fireEvent.click(getByLabelText('Yes'));
		fireEvent.click(getByLabelText(/Manually enter employees/));
		fireEvent.click(getByText('Next'));
		expect(history.location.pathname).toBe('/onboarding/step-4b');
	});
});
