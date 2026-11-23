import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Adds server-sent event support to older browsers
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { FeedRecognition } from './FeedRecognition';
import {
	loadLiveFeed,
	liveFeedListeners,
} from '../../store/actions/feed-actions';
import { selectFeed } from '../../store/selectors';
import { useBadges } from '../../hooks/useBadges';

const EventSource = NativeEventSource || EventSourcePolyfill;

function FeedSideBar() {
	const [open, setOpen] = useState(false);
	const feed = useSelector(selectFeed);
	const { badges, badgeById } = useBadges();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLiveFeed());

		/*
			EventSource can't send headers, so the token goes in the query
			string. The backend moves it into the Authorization header.
		*/
		const token = encodeURIComponent(
			`Bearer ${localStorage.getItem('id_token')}`,
		);
		const sse = new EventSource(
			`${process.env.REACT_APP_BASE_URL}/feed/live/?token=${token}`,
		);
		dispatch(liveFeedListeners(sse));

		return () => sse.close();
	}, [dispatch]);

	return (
		<aside
			className={`feed-bar${open ? ' is-rec-open' : ''}`}
			aria-label="Feed">
			{/* The whole header toggles the rail; the tab's clicks bubble here */}
			<div className="feed-headers" onClick={() => setOpen(!open)}>
				{/* One edge tab: the chevron points the way the rail moves */}
				<button
					type="button"
					className="feed-tab"
					aria-expanded={open}>
					<span
						className={`feed-tab__chevron ${
							open ? 'is-arrow-open' : 'is-arrow-closed'
						}`}
						aria-hidden="true"
					/>
					<span className="feed-tab__label">Feed</span>
				</button>
				<h3 className={open ? 'recently-thanked-title' : 'hidden'}>
					Recent Thanks
				</h3>
			</div>
			<div className="feed-rec-list">
				{feed.map((rec) => (
					<FeedRecognition
						key={rec.id}
						open={open}
						rec={rec}
						badge={badgeById[rec.badge_id]}
						badges={badges}
					/>
				))}
			</div>
		</aside>
	);
}

export default FeedSideBar;
