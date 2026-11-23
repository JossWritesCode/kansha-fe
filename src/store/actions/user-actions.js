import { axiosWithAuth } from '../../utils/axiosWithAuth';

// Login and Auth
export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_FAILURE = 'USER_AUTH_FAILURE';
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_NEWUSER = 'USER_LOGIN_NEWUSER';

// User Data
export const USER_UPDATE_PICTURE_START = 'USER_UPDATE_PICTURE_START';
export const USER_UPDATE_PICTURE_SUCCESS = 'USER_UPDATE_PICTURE_SUCCESS';
export const USER_UPDATE_PICTURE_FAILURE = 'USER_UPDATE_PICTURE_FAILURE';
export const USER_UPDATE_START = 'USER_UPDATE_START';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

/* Handles the auth0 redirect: reads the token out of the URL hash */
export const authorizeUser = (auth) => (dispatch) => {
	dispatch({ type: USER_AUTH_START });

	auth.handleAuthentication((err, authResult) => {
		if (err) {
			dispatch({ type: USER_AUTH_FAILURE, payload: err });
		} else if (authResult === null) {
			/*
				The URL had a hash that wasn't an auth0 callback (e.g. a
				stale "#" or an anchor link). Fall back to the normal login.
			*/
			dispatch(login());
		} else {
			dispatch({ type: USER_AUTH_SUCCESS });
		}
	});
};

/*
	Loads the logged-in user's data from our backend.
	The user is expected to already hold an auth0 token.
*/
export const login = () => (dispatch) => {
	dispatch({ type: USER_LOGIN_START });
	return finishLogin(dispatch);
};

export const finishLogin = (dispatch) =>
	axiosWithAuth()
		.get('/profile')
		.then((res) => {
			if (res.data.user) {
				dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.user });
			} else {
				/* No user yet: App sends them to onboarding */
				dispatch({ type: USER_LOGIN_NEWUSER, payload: res.data });
			}
		})
		.catch((err) => {
			/*
				Network errors and timeouts have no `response`. Always send a
				truthy payload so App leaves the loading spinner.
			*/
			dispatch({
				type: USER_LOGIN_FAILURE,
				payload: err.response || {
					status: 0,
					data: { message: err.message || 'Network error' },
				},
			});
		});

/* Updates the user's own name/picture. Resolves to true on success. */
export const update = (id, creds) => (dispatch) => {
	dispatch({ type: USER_UPDATE_START });
	return axiosWithAuth()
		.put(`/users/${id}`, creds)
		.then((res) => {
			dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data[0] });
			return true;
		})
		.catch((err) => {
			dispatch({ type: USER_UPDATE_FAILURE, payload: err });
			return false;
		});
};

/* Uploads a new profile photo. Resolves to true on success. */
export const uploadPicture = (data) => (dispatch) => {
	dispatch({ type: USER_UPDATE_PICTURE_START });
	return axiosWithAuth()
		.post('/profile-pic', data)
		.then(({ data: { url } }) => {
			dispatch({ type: USER_UPDATE_PICTURE_SUCCESS, payload: url });
			return true;
		})
		.catch((err) => {
			dispatch({ type: USER_UPDATE_PICTURE_FAILURE, payload: err });
			return false;
		});
};
