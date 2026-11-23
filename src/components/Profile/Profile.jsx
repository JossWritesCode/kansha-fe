import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { selectProfile } from '../../store/selectors';
import { useBadges } from '../../hooks/useBadges';
import { countBadges } from './countBadges';
import Activity from '../FeedSideBar/Activity';
import Badges from '../FeedSideBar/Badges';
import ProfileTeamList from './ProfileTeamList';
import { ReactComponent as EmptyActivity } from '../../assets/noactivity.svg';

/* The logged-in user's own profile: their team, badges and activity */
export function Profile() {
	const profile = useSelector(selectProfile);
	const { badges } = useBadges();
	const [profileData, setProfileData] = useState({});
	const [error, setError] = useState(false);
	const { id } = profile;

	useEffect(() => {
		let cancelled = false;
		axiosWithAuth()
			.get(`/profile/${id}`)
			.then(({ data }) => {
				if (!cancelled) setProfileData(data.peer || {});
			})
			.catch(() => {
				if (!cancelled) setError(true);
			});
		return () => {
			cancelled = true;
		};
	}, [id]);

	const userBadges = useMemo(
		() => countBadges(profileData.rec, id, badges),
		[profileData, id, badges],
	);
	const numberOfBadges = userBadges
		.filter((bdg) => bdg.badge)
		.reduce((sum, bdg) => sum + bdg.count, 0);
	const hasActivity = Boolean(profileData.rec?.length);

	return (
		<main className="container-entire-profile">
			<section className="my-team-members">
				<ProfileTeamList />
			</section>
			{error && (
				<p className="profile-error" role="alert">
					Your activity couldn't be loaded.
				</p>
			)}
			<section className="main-container-badges profile-panel">
				<div className="badges-title-container">
					<h1 className="title-badges">My badges</h1>
					{numberOfBadges > 0 && <h2>{numberOfBadges}</h2>}
				</div>
				{numberOfBadges > 0 ? (
					<div className="profile-badges">
						<Badges userBadges={userBadges} />
					</div>
				) : (
					<div className="profile-empty">
						{/* a faded badge: one that hasn't been earned yet */}
						<img
							className="profile-empty__badge"
							src={`${process.env.PUBLIC_URL}/badges/over-achiever.svg`}
							alt=""
						/>
						<p>No badges to display yet.</p>
					</div>
				)}
			</section>

			<section className="activity-card profile-panel">
				<h2 className="title-activity-card">My activity</h2>
				{hasActivity ? (
					<section id="profile-activity-card">
						<Activity
							profileBadges={badges}
							profileInfo={profileData}
							inModal={false}
						/>
					</section>
				) : (
					<div className="profile-empty">
						<EmptyActivity
							className="profile-empty__activity"
							aria-hidden="true"
							focusable="false"
						/>
						<p>No activity to display yet.</p>
					</div>
				)}
			</section>
		</main>
	);
}
