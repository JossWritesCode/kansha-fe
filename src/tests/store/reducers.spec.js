import mockAxios from 'axios';
import { userReducer } from '../../store/reducers/user-reducer';
import { feedReducer } from '../../store/reducers/feed-reducer';
import {
	USER_UPDATE_FAILURE,
	USER_UPDATE_PICTURE_FAILURE,
	USER_LOGIN_FAILURE,
} from '../../store/actions/user-actions';
import {
	FEED_EVENT_NEW_COMMENT,
	FEED_EVENT_NEW_REACTION,
	FEED_EVENT_REMOVE_COMMENT,
	FEED_EVENT_REMOVE_REACTION,
	loadPostData,
} from '../../store/actions/feed-actions';
import { loadBadges } from '../../store/actions/badge-actions';
import { makeTestStore } from '../utils';

const init = (reducer) => reducer(undefined, { type: '@@INIT' });

describe('userReducer', () => {
	it('keeps failed saves out of the login error', () => {
		let state = userReducer(init(userReducer), {
			type: USER_UPDATE_FAILURE,
			payload: new Error('500'),
		});
		state = userReducer(state, {
			type: USER_UPDATE_PICTURE_FAILURE,
			payload: new Error('413'),
		});
		expect(state.error).toBeNull();
		expect(state.updateError).toBeTruthy();
		expect(state.uploadError).toBeTruthy();
	});

	it('records login failures as the login error', () => {
		const state = userReducer(init(userReducer), {
			type: USER_LOGIN_FAILURE,
			payload: { status: 401 },
		});
		expect(state.error).toEqual({ status: 401 });
	});
});

describe('feedReducer live events', () => {
	it('handles events for a recognition whose data isn’t loaded yet', () => {
		let state = init(feedReducer);
		state = feedReducer(state, {
			type: FEED_EVENT_NEW_REACTION,
			payload: { id: 1, rec_id: 9 },
		});
		state = feedReducer(state, {
			type: FEED_EVENT_NEW_COMMENT,
			payload: { id: 2, rec_id: 9 },
		});
		expect(state.reactions[9]).toEqual([{ id: 1, rec_id: 9 }]);
		expect(state.comments[9]).toEqual([{ id: 2, rec_id: 9 }]);

		const removeUnknown = () =>
			feedReducer(state, {
				type: FEED_EVENT_REMOVE_COMMENT,
				payload: { id: '5', rec_id: 42 },
			});
		expect(removeUnknown).not.toThrow();
	});

	it('removes by id even when the event sends it as a string', () => {
		let state = feedReducer(init(feedReducer), {
			type: FEED_EVENT_NEW_REACTION,
			payload: { id: 1, rec_id: 9 },
		});
		state = feedReducer(state, {
			type: FEED_EVENT_REMOVE_REACTION,
			payload: { id: '1', rec_id: 9 },
		});
		expect(state.reactions[9]).toEqual([]);
	});
});

describe('request de-duplication', () => {
	it('loads the badge list only once', async () => {
		const store = makeTestStore();
		await Promise.all([
			store.dispatch(loadBadges()),
			store.dispatch(loadBadges()),
		]);
		store.dispatch(loadBadges());
		const badgeCalls = mockAxios.get.mock.calls.filter(
			([url]) => url === '/badges',
		);
		expect(badgeCalls).toHaveLength(1);
	});

	it('doesn’t repeat comment/reaction requests already in flight', async () => {
		const store = makeTestStore();
		await Promise.all([
			store.dispatch(loadPostData(5)),
			store.dispatch(loadPostData(5)),
		]);
		expect(mockAxios.get.mock.calls.map(([url]) => url)).toEqual([
			'/comments/5',
			'/reactions/5',
		]);
	});
});
