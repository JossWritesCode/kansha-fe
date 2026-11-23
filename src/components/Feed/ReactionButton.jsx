import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { removeReaction, reactToPost } from '../../store/actions/feed-actions';
import { ReactComponent as Heart } from '../../assets/singleheart.svg';

/* Toggles the logged-in user's (`id`) reaction to recognition `rec_id` */
export const ReactionButton = ({ reactions, rec_id, id, open, inModal }) => {
	const dispatch = useDispatch();

	// The id of this user's reaction, if they've reacted
	const userReactionId = useMemo(
		() => reactions?.find((reaction) => reaction.user_id === id)?.id,
		[reactions, id],
	);

	const handleReaction = () => {
		if (userReactionId) {
			dispatch(removeReaction(userReactionId, rec_id));
		} else {
			dispatch(reactToPost(rec_id));
		}
	};

	return (
		<button
			type="button"
			className={open ? 'reaction-button' : 'hidden-rec'}
			aria-label={
				userReactionId ? 'remove reaction to post' : 'react to post'
			}
			onClick={handleReaction}
		>
			<Heart className={userReactionId ? 'heart-full' : 'heart-empty'} />
			{inModal && <p>{reactions?.length || 0}</p>}
		</button>
	);
};
