import React from 'react';
import { fireEvent } from '@testing-library/react';
import mockAxios from 'axios';
import RecogModal from '../components/RecogModal/index';
import { renderWithRouterAndRedux } from './utils';

const recipient = { id: 2, first_name: 'Bruce', last_name: 'Banner' };

describe('<RecogModal />', () => {
	it('only enables Send once there is a message', () => {
		const { getByText, getByLabelText } = renderWithRouterAndRedux(
			<RecogModal profile={recipient} close={() => {}} />,
		);
		expect(getByText('Send')).toBeDisabled();
		fireEvent.change(getByLabelText('Type your message here'), {
			target: { value: 'Thanks!' },
		});
		expect(getByText('Send')).toBeEnabled();
	});

	it('confirms only after the API accepts the recognition', async () => {
		const { getByText, getByLabelText, findByText } =
			renderWithRouterAndRedux(
				<RecogModal profile={recipient} close={() => {}} />,
			);
		fireEvent.change(getByLabelText('Type your message here'), {
			target: { value: 'Thanks!' },
		});
		fireEvent.click(getByText('Send'));
		expect(await findByText(/has been sent/)).toBeInTheDocument();
		expect(mockAxios.post).toHaveBeenCalledWith(
			'/rec',
			expect.objectContaining({
				message: 'Thanks!',
				recipient: 2,
				sender: 1,
			}),
		);
	});

	it('shows an error when sending fails', async () => {
		mockAxios.post.mockImplementation(() =>
			Promise.reject(new Error('500')),
		);
		const { getByText, getByLabelText, findByText } =
			renderWithRouterAndRedux(
				<RecogModal profile={recipient} close={() => {}} />,
			);
		fireEvent.change(getByLabelText('Type your message here'), {
			target: { value: 'Thanks!' },
		});
		fireEvent.click(getByText('Send'));
		expect(await findByText(/couldn't be sent/)).toBeInTheDocument();
	});
});
