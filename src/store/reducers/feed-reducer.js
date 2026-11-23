import {
	FEED_LOAD_START,
	FEED_LOAD_SUCCESS,
	FEED_LOAD_FAILURE,
	POST_DATA_LOAD_SUCCESS,
	POST_DATA_LOAD_FAILURE,
	FEED_REACT_FAILURE,
	FEED_REACT_REMOVE_FAILURE,
	FEED_COMMENT_FAILURE,
	FEED_EVENT_NEW_REC,
	FEED_EVENT_NEW_REACTION,
	FEED_EVENT_NEW_COMMENT,
	FEED_EVENT_REMOVE_REACTION,
	FEED_EVENT_REMOVE_COMMENT,
	FEED_EVENT_REMOVE_REC,
} from '../actions/feed-actions';

const initialState = {
	feed: [],
	// comments and reactions, keyed by recognition id
	reactions: {},
	comments: {},
	isLoading: false,
	error: null,
};

/*
	Live events can arrive for a recognition whose comments/reactions haven't
	been loaded yet, so the list may be missing.
*/
const addTo = (map, item) => ({
	...map,
	[item.rec_id]: [...(map[item.rec_id] || []), item],
});

const removeFrom = (map, { rec_id, id }) => {
	if (!map[rec_id]) return map;
	return {
		...map,
		[rec_id]: map[rec_id].filter((item) => item.id !== Number(id)),
	};
};

export const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case FEED_LOAD_START:
			return { ...state, isLoading: true };
		case FEED_LOAD_SUCCESS:
			return { ...state, isLoading: false, feed: [...action.payload] };
		case FEED_LOAD_FAILURE:
			return { ...state, isLoading: false, error: action.payload };

		case POST_DATA_LOAD_SUCCESS: {
			const { id, type } = action.data;
			return {
				...state,
				[type]: {
					...state[type],
					[id]: Array.isArray(action.payload) ? action.payload : [],
				},
			};
		}

		case POST_DATA_LOAD_FAILURE:
		case FEED_REACT_FAILURE:
		case FEED_REACT_REMOVE_FAILURE:
		case FEED_COMMENT_FAILURE:
			return { ...state, error: action.payload };

		case FEED_EVENT_NEW_REC:
			return { ...state, feed: [action.payload, ...state.feed] };
		case FEED_EVENT_REMOVE_REC:
			return {
				...state,
				feed: state.feed.filter(
					(rec) => rec.id !== Number(action.payload.id),
				),
			};
		case FEED_EVENT_NEW_REACTION:
			return {
				...state,
				reactions: addTo(state.reactions, action.payload),
			};
		case FEED_EVENT_REMOVE_REACTION:
			return {
				...state,
				reactions: removeFrom(state.reactions, action.payload),
			};
		case FEED_EVENT_NEW_COMMENT:
			return {
				...state,
				comments: addTo(state.comments, action.payload),
			};
		case FEED_EVENT_REMOVE_COMMENT:
			return {
				...state,
				comments: removeFrom(state.comments, action.payload),
			};

		default:
			return state;
	}
};
