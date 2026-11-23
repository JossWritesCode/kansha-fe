import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reduxReducer } from './store';

import './SCSS/main.scss';
import { App } from './App';

// Log actions in development only
const middleware =
	process.env.NODE_ENV === 'development'
		? [thunk, createLogger({ collapsed: true })]
		: [thunk];
const reduxStore = createStore(reduxReducer, applyMiddleware(...middleware));

ReactDOM.render(
	<Provider store={reduxStore}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'),
);
