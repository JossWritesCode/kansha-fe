import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const RECOG_SEND_START = 'RECOG_SEND_START';
export const RECOG_SEND_SUCCESS = 'RECOG_SEND_SUCCESS';
export const RECOG_SEND_FAILURE = 'RECOG_SEND_FAILURE';

/* Resolves to true when the recognition was sent */
export const sendRecog = (recognition) => (dispatch) => {
	dispatch({ type: RECOG_SEND_START });
	return axiosWithAuth()
		.post('/rec', recognition)
		.then((res) => {
			dispatch({ type: RECOG_SEND_SUCCESS, payload: res.data });
			return true;
		})
		.catch((err) => {
			dispatch({ type: RECOG_SEND_FAILURE, payload: err });
			return false;
		});
};
