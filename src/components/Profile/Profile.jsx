import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { selectProfile } from '../../store/selectors';
import { useBadges } from '../../hooks/useBadges';
import { countBadges } from './countBadges';
import Activity from '../FeedSideBar/Activity';
import Badges from '../FeedSideBar/Badges';
import ProfileTeamList from './ProfileTeamList';
import { ReactComponent as EmptyBadges } from '../../assets/NoBadgeFeed.svg';
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
			{error && <p role="alert">Your activity couldn't be loaded.</p>}
			{numberOfBadges > 0 ? (
				<section className="main-container-badges">
					<div className="badges-title-container">
						<h1 className="title-badges">My badges</h1>
						<h2>{numberOfBadges}</h2>
					</div>
					<div className="profile-badges">
						<Badges userBadges={userBadges} />
					</div>
				</section>
			) : (
				<main className="empty-feed">
					<EmptyBadges />
				</main>
			)}

			{hasActivity ? (
				<section className="activity-card">
					<h5 className="title-activity-card">My activity</h5>
					<section id="profile-activity-card">
						<Activity
							profileBadges={badges}
							profileInfo={profileData}
							inModal={false}
						/>
					</section>
				</section>
			) : (
				<main className="empty-feed">
					<EmptyActivity />
				</main>
			)}
		</main>
	);
}
