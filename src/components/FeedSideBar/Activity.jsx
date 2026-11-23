import React, { useMemo } from 'react';
import { RecognitionCard } from '../Profile/RecognitionCard';

/* A user's recognitions, newest first */
function Activity({ profileBadges, profileInfo, inModal }) {
	const recs = useMemo(
		() =>
			[...(profileInfo.rec || [])].sort(
				(a, b) => new Date(b.date) - new Date(a.date),
			),
		[profileInfo.rec],
	);

	return (
		<div className="profile-activity">
			{inModal && <h2 className="activity-header">Activity</h2>}
			<section className="inner-activity-card">
				{recs.map((recognition) => (
					<div
						className="container-card-and-buttons"
						key={recognition.id}
					>
						<RecognitionCard
							profileBadges={profileBadges}
							recognition={recognition}
							viewedUserId={profileInfo.id}
							inModal={inModal}
						/>
					</div>
				))}
			</section>
		</div>
	);
}

export default Activity;
