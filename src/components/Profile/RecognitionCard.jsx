import React, { useEffect, useMemo, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostData } from '../../store/actions/feed-actions';
import { timeAgo } from '../../utils/timeago';
import {
	selectComments,
	selectProfile,
	selectReactions,
} from '../../store/selectors';
import { CommentButton } from '../Feed/CommentButton';
import { ReactionButton } from '../Feed/ReactionButton';
import ReactionModal from '../FeedSideBar/ReactionModal';
import ProfileModal from '../FeedSideBar/ProfileModal';

/*
	One recognition in a user's activity list. `viewedUserId` is whose
	activity this is; the names on a recognition are always the other person.
*/
export const RecognitionCard = memo(
	({ recognition, viewedUserId, profileBadges, inModal }) => {
		const profile = useSelector(selectProfile);
		const reactions = useSelector(selectReactions(recognition.id));
		const comments = useSelector(selectComments(recognition.id));
		const [showComments, setShowComments] = useState(false);
		const [showProfile, setShowProfile] = useState(false);
		const dispatch = useDispatch();
		const loaded = Boolean(comments || reactions);

		// Older recognitions aren't in the live feed, so load their counts
		useEffect(() => {
			if (!loaded) dispatch(loadPostData(recognition.id));
		}, [dispatch, recognition.id, loaded]);

		const time = useMemo(() => timeAgo(recognition.date), [recognition]);
		const badge = profileBadges.find(
			(bdg) => bdg.id === recognition.badge_id,
		);
		const sent = recognition.sender === viewedUserId;
		const otherUserId = sent ? recognition.recipient : recognition.sender;
		const name = `${recognition.first_name} ${recognition.last_name}`;

		return (
			<section className="container-recognition-card">
				{showComments && (
					<ReactionModal
						close={() => setShowComments(false)}
						profile={profile}
						rec={recognition}
						reactions={reactions}
						badge={badge}
						comments={comments}
						picture={recognition.profile_pic}
					/>
				)}
				{showProfile && (
					<ProfileModal
						close={() => setShowProfile(false)}
						badges={profileBadges}
						profileId={otherUserId}
					/>
				)}
				{/* Profiles opened inside a modal don't open further modals */}
				<button
					type="button"
					className="recognition-avatar"
					aria-label={`View ${name}'s profile`}
					disabled={inModal}
					onClick={() => setShowProfile(true)}
				>
					<img src={recognition.profile_pic} alt="" width="35px" />
				</button>
				<section className="activity-section">
					<div className="recognition-message">
						<div className="rec-info">
							<p>
								{sent ? 'Sent to ' : 'From '}
								<span className="rec-info-name">{name}</span>
							</p>
							<span className="time" role="presentation">
								&nbsp;{time}
							</span>
						</div>
						<p
							style={{
								marginTop: '3px',
								fontSize: '1.4rem',
								color: '#000d22',
							}}
						>
							{recognition.message}
						</p>
					</div>
					{badge && (
						<div>
							<img
								className="activity-badge"
								src={badge.badge_URL}
								alt={badge.badge_name}
								width="50px"
							/>
						</div>
					)}
				</section>
				<div className="rm-buttons">
					<ReactionButton
						reactions={reactions}
						open
						inModal
						rec_id={recognition.id}
						id={profile.id}
					/>
					<CommentButton
						comments={comments}
						open
						inModal
						id={profile.id}
						handleComment={() => setShowComments(true)}
					/>
				</div>
			</section>
		);
	},
);
