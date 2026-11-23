import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_FAILURE,
	USER_LOGIN_START,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGIN_NEWUSER,
	USER_UPDATE_PICTURE_START,
	USER_UPDATE_PICTURE_SUCCESS,
	USER_UPDATE_PICTURE_FAILURE,
	USER_UPDATE_START,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILURE,
} from '../actions/user-actions';

const initialState = {
	profile: {
		first_name: '',
		last_name: '',
		org_name: '',
		org_id: '',
		job_title: '',
		user_type: '',
		department: '',
	},
	isOnboarding: false,
	isLoggingIn: false,
	isUploading: false,
	isUpdating: false,
	authenticated: false,
	/*
		`error` is only for auth/login failures: App treats it as "not signed
		in". Failed saves use their own fields so they don't log the user out.
	*/
	error: null,
	updateError: null,
	uploadError: null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_AUTH_START:
			return { ...state, authenticated: false };
		case USER_AUTH_SUCCESS:
			return { ...state, authenticated: true };
		case USER_AUTH_FAILURE:
			return { ...state, authenticated: false, error: action.payload };

		case USER_LOGIN_START:
			return { ...state, isLoggingIn: true };
		case USER_LOGIN_SUCCESS:
			return { ...state, profile: action.payload, isLoggingIn: false };
		case USER_LOGIN_NEWUSER:
			return { ...state, isOnboarding: true, isLoggingIn: false };
		case USER_LOGIN_FAILURE:
			return { ...state, error: action.payload, isLoggingIn: false };

		case USER_UPDATE_START:
			return { ...state, isUpdating: true, updateError: null };
		case USER_UPDATE_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, ...action.payload },
				isUpdating: false,
			};
		case USER_UPDATE_FAILURE:
			return { ...state, isUpdating: false, updateError: action.payload };

		case USER_UPDATE_PICTURE_START:
			return { ...state, isUploading: true, uploadError: null };
		case USER_UPDATE_PICTURE_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, profile_picture: action.payload },
				isUploading: false,
			};
		case USER_UPDATE_PICTURE_FAILURE:
			return {
				...state,
				isUploading: false,
				uploadError: action.payload,
			};

		default:
			return state;
	}
};
