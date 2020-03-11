import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import FeedRecognition from './FeedRecognition';
import {
	loadLiveFeed,
	liveFeedListeners,
} from '../../store/actions/feed-actions';

import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

const EventSource = NativeEventSource || EventSourcePolyfill;

function FeedSideBar() {
	const [open, setOpen] = React.useState(false);

	const [badges, setBadges] = useState([]);

	const { feed } = useSelector(({ liveFeed, user }) => ({
		...liveFeed,
		...user,
	}));

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLiveFeed());

		const src = `${
			process.env.REACT_APP_BASE_URL
		}/feed/live/?token=Bearer ${localStorage.getItem('id_token')}`;

		const sse = new EventSource(src);

		dispatch(liveFeedListeners(sse));

		return function cleanup() {
			sse.close();
		};
	}, [dispatch]);

	useEffect(() => {
		axiosWithAuth()
			.get('/badges')
			.then(res => {
				setBadges(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [dispatch]);

	return (
		<aside className={`feed-bar${open ? ' is-rec-open' : ''}`}>
			<div className="feed-headers" onClick={() => setOpen(!open)}>
				<h2 className={`${open ? 'is-arrow-open' : 'is-arrow-closed'}`}>
					Feed
				</h2>
				<h3 className={`${open ? 'recently-thanked-title' : 'hidden'}`}>
					Recent Thankfulness
				</h3>
			</div>
			<div className="feed-rec-list">
				{feed.map(rec => (
					<FeedRecognition
						open={open}
						key={rec.id}
						rec={rec}
						badge={badges[rec.badge_id - 1]}
					/>
				))}
			</div>
		</aside>
	);
}

export default FeedSideBar;
