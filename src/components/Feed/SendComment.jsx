import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/actions/feed-actions';

const MAX_LENGTH = 140;

export const SendComments = ({ id, onSent }) => {
	const [newComment, setNewComment] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const message = newComment.trim();
		if (!message) return;
		setIsSending(true);
		setError(null);
		const ok = await dispatch(addComment(id, message));
		setIsSending(false);
		if (ok) {
			setNewComment('');
			if (onSent) onSent();
		} else {
			setError("Your comment couldn't be sent. Try again.");
		}
	};

	return (
		<form className="rm-comment-box" onSubmit={handleSubmit}>
			<textarea
				aria-label="Comment"
				placeholder="Type message here"
				value={newComment}
				onChange={(event) => setNewComment(event.target.value)}
				maxLength={MAX_LENGTH}
			/>
			{error && <p role="alert">{error}</p>}
			<button
				type="submit"
				className="btn-onboarding-confirm"
				disabled={!newComment.trim() || isSending}
			>
				Send
			</button>
		</form>
	);
};
