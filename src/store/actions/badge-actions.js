import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const BADGES_LOAD_START = 'BADGES_LOAD_START';
export const BADGES_LOAD_SUCCESS = 'BADGES_LOAD_SUCCESS';
export const BADGES_LOAD_FAILURE = 'BADGES_LOAD_FAILURE';

/*
	The badge list never changes while the app is open, so it's fetched once
	and shared. Calling this again while loading or after success is a no-op.
*/
export const loadBadges = () => (dispatch, getState) => {
	const { status } = getState().badges;
	if (status === 'loading' || status === 'loaded') return;

	dispatch({ type: BADGES_LOAD_START });
	return axiosWithAuth()
		.get('/badges')
		.then((res) =>
			dispatch({ type: BADGES_LOAD_SUCCESS, payload: res.data }),
		)
		.catch((err) => dispatch({ type: BADGES_LOAD_FAILURE, payload: err }));
};
