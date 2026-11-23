import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostData } from '../../store/actions/feed-actions';
import {
	selectComments,
	selectProfile,
	selectReactions,
} from '../../store/selectors';
import { ReactionButton } from '../Feed/ReactionButton';
import { CommentButton } from '../Feed/CommentButton';
import ReactionModal from './ReactionModal';
import ProfileModal from './ProfileModal';

/* One recognition in the feed sidebar */
export const FeedRecognition = memo(({ rec, badge, badges, open }) => {
	const [showComments, setShowComments] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	const { id: rec_id } = rec;
	const dispatch = useDispatch();
	const profile = useSelector(selectProfile);
	const comments = useSelector(selectComments(rec_id));
	const reactions = useSelector(selectReactions(rec_id));
	const loaded = Boolean(comments || reactions);

	useEffect(() => {
		if (!loaded) dispatch(loadPostData(rec_id));
	}, [dispatch, rec_id, loaded]);

	return (
		<div className="recognition">
			{showProfile && (
				<ProfileModal
					close={() => setShowProfile(false)}
					badges={badges}
					profileId={rec.recipient}
				/>
			)}
			{showComments && (
				<ReactionModal
					close={() => setShowComments(false)}
					profile={profile}
					rec={rec}
					reactions={reactions}
					badge={badge}
					comments={comments}
					picture={rec.profile_picture}
				/>
			)}
			<img
				alt="profile"
				className="rec-profile-pic"
				src={rec.recipient_picture}
				onClick={() => setShowProfile(true)}
			/>
			<div className="rec-badge-and-message">
				{badge && (
					<img
						alt="badge"
						className={open ? 'rec-badge' : 'hidden-rec'}
						src={badge.badge_URL}
					/>
				)}
				<p
					style={badge ? undefined : { paddingLeft: '10px' }}
					className={open ? 'rec-message' : 'hidden-rec'}
				>
					{rec.message}
				</p>
			</div>
			<div className="feed-reaction-buttons">
				{reactions && (
					<ReactionButton
						id={profile.id}
						rec_id={rec_id}
						reactions={reactions}
						open={open}
					/>
				)}
				{comments && (
					<CommentButton
						id={profile.id}
						comments={comments}
						open={open}
						handleComment={() => setShowComments(true)}
					/>
				)}
			</div>
		</div>
	);
});
