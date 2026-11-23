import React, { useMemo } from 'react';
import { ReactComponent as AddComment } from '../../assets/addcomment.svg';

/* Shows whether the logged-in user (`id`) has commented, and opens the comments */
export const CommentButton = ({
	comments,
	id,
	open,
	handleComment,
	inModal,
}) => {
	const hasCommented = useMemo(
		() => Boolean(comments?.some((comment) => comment.user_id === id)),
		[comments, id],
	);

	return (
		<button
			type="button"
			className={open ? 'comment-button' : 'hidden-rec'}
			aria-label="add a comment"
			onClick={handleComment}
		>
			<AddComment
				className={hasCommented ? 'comment-full' : 'comment-empty'}
			/>
			{inModal && <p>{comments?.length || 0}</p>}
		</button>
	);
};
