import React, { useState, useEffect, useMemo } from 'react';
import Modal from '../Modal';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import Activity from './Activity';
import Badges from './Badges';
import { countBadges } from '../Profile/countBadges';

/*
	Shows another user's profile: their badges and activity.
	Opened from the feed sidebar, the Teams pages, the Workspace and the
	profile activity list.

	`inModal` (default true) tells the activity list it's inside a modal, so
	sent/received is worked out from the viewed user's side and their
	recognitions don't open further profile modals.
*/
function ProfileModal({ badges, close, profileId, inModal = true }) {
	const [profileInfo, setProfileInfo] = useState({});
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;
		axiosWithAuth()
			.get(`/profile/${profileId}`)
			.then(({ data }) => {
				if (cancelled) return;
				// `peer` is false when the user isn't in your organization
				if (data.peer) setProfileInfo(data.peer);
				else setError(true);
			})
			.catch(() => {
				if (!cancelled) setError(true);
			});
		return () => {
			cancelled = true;
		};
	}, [profileId]);

	const userBadges = useMemo(
		() => countBadges(profileInfo.rec, profileId, badges),
		[profileInfo, profileId, badges],
	);
	const numberOfBadges = userBadges.reduce((sum, bdg) => sum + bdg.count, 0);

	return (
		<Modal close={() => close(false)}>
			<div className="profile-modal">
				{error ? (
					<p role="alert">This profile couldn't be loaded.</p>
				) : (
					<>
						<section className="profile-header">
							<img
								className="profile-picture"
								alt={profileInfo.first_name}
								src={profileInfo.profile_picture}
								width="173px"
							/>
							<div className="person-info">
								<h1>{profileInfo.first_name}</h1>
								{profileInfo.team_name && (
									<h3>{profileInfo.team_name}</h3>
								)}
							</div>
						</section>
						<main className="profile-main">
							<div className="profile-badges">
								<div className="badges-title-container">
									<h2 className="badges-title">Badges</h2>
									<div className="number-of-badges">
										<h2>{numberOfBadges}</h2>
									</div>
								</div>
								<Badges userBadges={userBadges} />
							</div>
							<Activity
								profileBadges={badges}
								profileInfo={profileInfo}
								inModal={inModal}
							/>
						</main>
					</>
				)}
			</div>
		</Modal>
	);
}
export default ProfileModal;
