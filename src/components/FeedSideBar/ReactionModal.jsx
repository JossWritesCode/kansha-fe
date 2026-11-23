import React, { useState } from 'react';
import Modal from '../Modal';
import { ReactionButton } from '../Feed/ReactionButton';
import { SendComments } from '../Feed/SendComment';
import { CommentButton } from '../Feed/CommentButton';
import RMComments from './RMComments';

/* A recognition with its reactions and comments */
function ReactionModal({
	profile,
	picture,
	rec,
	reactions,
	comments = [],
	badge,
	close,
}) {
	const [messageSent, setMessageSent] = useState(false);

	return (
		<Modal close={() => close(false)}>
			<section className="rm-parent-cont">
				<div className="rm-user-info">
					<img alt="" className="rm-profile-pic" src={picture} />
					<p>
						<span>{rec.first_name}</span>{' '}
						<span>{rec.last_name}</span>
					</p>
					<p className="rm-job_title">{rec.recipient_job_title}</p>
					{badge && (
						<img
							alt="badge"
							className="rm-badge"
							src={badge.badge_URL}
						/>
					)}
					<div className="rm-buttons">
						<ReactionButton
							reactions={reactions}
							open
							inModal
							rec_id={rec.id}
							id={profile.id}
						/>
						<CommentButton
							comments={comments}
							open
							inModal
							id={profile.id}
						/>
					</div>
					<p className="rm-message">{rec.message}</p>
				</div>
				<div className="rm-comment-box">
					{!messageSent && (
						<SendComments
							id={rec.id}
							onSent={() => setMessageSent(true)}
						/>
					)}
					{messageSent && (
						<div className="rm-comments">
							{comments.map((comm) => (
								<RMComments
									key={comm.id}
									pic={comm.profile_picture}
									message={comm.message}
								/>
							))}
						</div>
					)}
				</div>
			</section>
		</Modal>
	);
}
export default ReactionModal;
