import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as AddBadgeIcon } from '../../assets/addbadge.svg';
import { ReactComponent as CloseIcon } from '../../assets/closex.svg';
import { sendRecog } from '../../store/actions/recog-actions';
import { useBadges } from '../../hooks/useBadges';

/* Compose and send a recognition to `profile`. Rendered inside a Modal. */
function RecogModal({ profile, close }) {
	const dispatch = useDispatch();
	const senderId = useSelector((state) => state.user.profile.id);
	const isSending = useSelector((state) => state.recog.isSending);
	const { badges, badgeById } = useBadges();

	const [isPickingBadge, setIsPickingBadge] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState('');
	const [badgeId, setBadgeId] = useState(null);

	const { first_name, last_name, job_title, department, profile_picture } =
		profile;
	const selectedBadge = badgeId ? badgeById[badgeId] : null;

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!message.trim()) return;
		setError(null);
		const ok = await dispatch(
			sendRecog({
				message: message.trim(),
				sender: senderId,
				recipient: profile.id,
				badge_id: badgeId,
				date: new Date(),
			}),
		);
		if (ok) {
			setSent(true);
		} else {
			setError("Your recognition couldn't be sent. Try again.");
		}
	};

	const chooseBadge = (id) => {
		setBadgeId(id);
		setIsPickingBadge(false);
	};

	if (sent) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<p style={{ fontSize: '1.6rem' }}>
					Your recognition has been sent!
				</p>
				<button className="btn-modal" onClick={() => close(false)}>
					Ok
				</button>
			</div>
		);
	}

	return (
		<section className="rec-modal">
			<section>
				<img src={profile_picture} alt="" />
				<h5>
					{first_name} {last_name}
				</h5>
				<p>{job_title}</p>
				<p>{department}</p>
			</section>
			{isPickingBadge ? (
				<div>
					<section>
						{badges.map((badge) => (
							<img
								src={badge.badge_URL}
								alt={badge.badge_name || ''}
								key={badge.id}
								onClick={() => chooseBadge(badge.id)}
							/>
						))}
					</section>
					<button
						type="button"
						aria-label="Close badge picker"
						onClick={() => setIsPickingBadge(false)}
						className="corner-button"
					>
						<CloseIcon />
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<textarea
						value={message}
						name="message"
						onChange={(e) => setMessage(e.target.value)}
						aria-label="Type your message here"
						placeholder="Type your message here..."
					/>
					<section>
						{selectedBadge && (
							<div>
								<span
									role="button"
									aria-label="Remove badge"
									onClick={() => setBadgeId(null)}
								>
									-
								</span>
								<img src={selectedBadge.badge_URL} alt="" />
							</div>
						)}
					</section>
					<button
						type="button"
						aria-label="Add a badge"
						onClick={() => setIsPickingBadge(true)}
						className="corner-button"
					>
						<AddBadgeIcon />
					</button>
					{error && <p role="alert">{error}</p>}
					<button
						type="submit"
						className="send-button"
						disabled={!message.trim() || isSending}
					>
						Send
					</button>
				</form>
			)}
		</section>
	);
}

export default RecogModal;
