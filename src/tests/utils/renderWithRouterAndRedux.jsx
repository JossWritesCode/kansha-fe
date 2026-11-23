import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeTestStore } from './testAdminUser';

export const renderWithRouterAndRedux = (
	ui,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
		store = makeTestStore(),
	} = {},
) => {
	const Wrapper = ({ children }) => (
		<Provider store={store}>
			<Router history={history}>{children}</Router>
		</Provider>
	);
	return {
		...render(ui, { wrapper: Wrapper }),
		history,
		store,
	};
};
