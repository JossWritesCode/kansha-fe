import { axiosWithAuth } from '../../utils/axiosWithAuth';

// Data Fetching Actions
export const FEED_LOAD_START = 'FEED_LOAD_START';
export const FEED_LOAD_SUCCESS = 'FEED_LOAD_SUCCESS';
export const FEED_LOAD_FAILURE = 'FEED_LOAD_FAILURE';
export const POST_DATA_LOAD_SUCCESS = 'POST_DATA_LOAD_SUCCESS';
export const POST_DATA_LOAD_FAILURE = 'POST_DATA_LOAD_FAILURE';

// Server Sent Events Actions (the backend uses these as event names)
export const FEED_EVENT_NEW_REC = 'FEED_EVENT_NEW_REC';
export const FEED_EVENT_NEW_COMMENT = 'FEED_EVENT_NEW_COMMENT';
export const FEED_EVENT_NEW_REACTION = 'FEED_EVENT_NEW_REACTION';
export const FEED_EVENT_REMOVE_REC = 'FEED_EVENT_REMOVE_REC';
export const FEED_EVENT_REMOVE_COMMENT = 'FEED_EVENT_REMOVE_COMMENT';
export const FEED_EVENT_REMOVE_REACTION = 'FEED_EVENT_REMOVE_REACTION';

// User Input Actions
export const FEED_REACT_FAILURE = 'FEED_REACT_FAILURE';
export const FEED_REACT_REMOVE_FAILURE = 'FEED_REACT_REMOVE_FAILURE';
export const FEED_COMMENT_FAILURE = 'FEED_COMMENT_FAILURE';

// Fetches the 25 newest recognitions
export const loadLiveFeed = () => (dispatch) => {
	dispatch({ type: FEED_LOAD_START });
	return axiosWithAuth()
		.get('/feed')
		.then((res) => dispatch({ type: FEED_LOAD_SUCCESS, payload: res.data }))
		.catch((err) => dispatch({ type: FEED_LOAD_FAILURE, payload: err }));
};

/*
	Loads the comments and reactions for one recognition. The same
	recognition can be on screen in several places at once (feed sidebar,
	profile activity), so requests already in flight aren't repeated.
*/
const pendingPostData = new Set();

export const loadPostData = (id) => (dispatch) => {
	if (pendingPostData.has(id)) return;
	pendingPostData.add(id);

	const load = (type) =>
		axiosWithAuth()
			.get(`/${type}/${id}`)
			.then((res) =>
				dispatch({
					type: POST_DATA_LOAD_SUCCESS,
					data: { id, type },
					payload: res.data,
				}),
			)
			.catch((err) =>
				dispatch({ type: POST_DATA_LOAD_FAILURE, payload: err }),
			);

	return Promise.all([load('comments'), load('reactions')]).finally(() =>
		pendingPostData.delete(id),
	);
};

/*
	Reacting and commenting don't change state directly: the backend
	broadcasts the change back as a server-sent event, which updates the feed.
*/
export const reactToPost = (rec_id) => (dispatch) =>
	axiosWithAuth()
		.post('/reactions', { rec_id, date: new Date() })
		.catch((err) => dispatch({ type: FEED_REACT_FAILURE, payload: err }));

export const removeReaction = (id, rec_id) => (dispatch) =>
	axiosWithAuth()
		.delete(`/reactions/${id}?rec_id=${rec_id}`)
		.catch((err) =>
			dispatch({ type: FEED_REACT_REMOVE_FAILURE, payload: err }),
		);

/* Resolves to true when the comment was saved */
export const addComment = (rec_id, message) => (dispatch) =>
	axiosWithAuth()
		.post('/comments', { rec_id, message, date: new Date() })
		.then(() => true)
		.catch((err) => {
			dispatch({ type: FEED_COMMENT_FAILURE, payload: err });
			return false;
		});

/*
	Subscribes the store to the live feed. `sse` is an EventSource; see
	https://developer.mozilla.org/docs/Web/API/Server-sent_events
*/
const FEED_EVENTS = [
	FEED_EVENT_NEW_REC,
	FEED_EVENT_NEW_COMMENT,
	FEED_EVENT_NEW_REACTION,
	FEED_EVENT_REMOVE_REC,
	FEED_EVENT_REMOVE_COMMENT,
	FEED_EVENT_REMOVE_REACTION,
];

export const liveFeedListeners = (sse) => (dispatch) => {
	FEED_EVENTS.forEach((type) =>
		sse.addEventListener(type, (event) =>
			dispatch({ type, payload: JSON.parse(event.data) }),
		),
	);
};
