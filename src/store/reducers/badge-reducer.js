import {
	BADGES_LOAD_START,
	BADGES_LOAD_SUCCESS,
	BADGES_LOAD_FAILURE,
} from '../actions/badge-actions';

const initialState = {
	list: [],
	// idle | loading | loaded | failed
	status: 'idle',
};

export const badgeReducer = (state = initialState, action) => {
	switch (action.type) {
		case BADGES_LOAD_START:
			return { ...state, status: 'loading' };
		case BADGES_LOAD_SUCCESS:
			return {
				list: Array.isArray(action.payload) ? action.payload : [],
				status: 'loaded',
			};
		case BADGES_LOAD_FAILURE:
			// 'failed' lets a later mount retry
			return { ...state, status: 'failed' };
		default:
			return state;
	}
};
