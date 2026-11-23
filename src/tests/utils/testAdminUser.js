import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxReducer } from '../../store';

/* A store with the given user profile logged in */
export const makeTestStore = (profile = {}) =>
	createStore(
		reduxReducer,
		{
			user: {
				...reduxReducer(undefined, { type: '@@INIT' }).user,
				profile: {
					id: 1,
					first_name: 'Test',
					last_name: 'User',
					org_name: 'Org 1',
					org_id: 1,
					job_title: 'CEO',
					user_type: 'standard',
					department: '',
					...profile,
				},
			},
		},
		applyMiddleware(thunk),
	);

export const testAdminUser = () => makeTestStore({ user_type: 'admin' });
