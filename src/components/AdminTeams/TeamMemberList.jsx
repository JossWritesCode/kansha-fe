import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import Member from './Member';

const byFirstName = (a, b) => a.first_name.localeCompare(b.first_name);

// The API pages team members (10 by default); this page has no paging
const MEMBER_LIMIT = 100;

/* The members of one team, at /teams/:id */
function TeamMemberList() {
	const { id } = useParams();
	const history = useHistory();
	const [teamDetails, setTeamDetails] = useState(null);
	const [teamCount, setTeamCount] = useState(0);
	const [filter, setFilter] = useState('');
	const [error, setError] = useState(false);
	const search = useDebouncedValue(filter.trim());

	useEffect(() => {
		let cancelled = false;
		const params = new URLSearchParams({ search, limit: MEMBER_LIMIT });
		axiosWithAuth()
			.get(`/teams/${id}?${params}`)
			.then(({ data }) => {
				if (cancelled) return;
				// The API returns an empty body when no members match the search
				setTeamDetails((prev) =>
					data
						? {
								...data,
								team_members: [
									...(data.team_members || []),
								].sort(byFirstName),
							}
						: { name: prev?.name || '', team_members: [] },
				);
				setError(false);
			})
			.catch(() => {
				if (!cancelled) setError(true);
			});
		return () => {
			cancelled = true;
		};
	}, [id, search]);

	useEffect(() => {
		axiosWithAuth()
			.get('/teams/')
			.then((res) => setTeamCount(res.data.length))
			.catch(() => {});
	}, []);

	if (error && !teamDetails) {
		return (
			<section className="teams-dashboard">
				<p role="alert">This team couldn't be loaded.</p>
				<button onClick={() => history.push('/organization')}>
					Back to all teams
				</button>
			</section>
		);
	}

	if (!teamDetails) {
		return <Loader type="Rings" color="#b71952" height={100} width={100} />;
	}

	return (
		<section className="teams-dashboard">
			<div className="header">
				<div className="teams-name-button">
					<h1>{teamDetails.name}</h1>
					<button
						onClick={() => history.push('/organization')}
					>{`All Teams (${teamCount})`}</button>
				</div>
				<h2 className="members-number">{`Members (${teamDetails.team_members.length})`}</h2>
			</div>
			<div className="employee-filter-container">
				<span className="filter-label">Filter:</span>
				<button className="btn-filter is-active" aria-pressed="true">
					Members
				</button>
				<div className="employee-search-container">
					<input
						value={filter}
						onChange={(event) => setFilter(event.target.value)}
						type="text"
						id="search"
						name="search"
						aria-label="Search team members"
						placeholder="Search"
					/>
				</div>
			</div>
			<table className="team-member-table">
				<tbody>
					{teamDetails.team_members.map((member) => (
						<Member
							key={member.member_id || member.id}
							member={member}
							teamDetails={teamDetails}
							setTeamDetails={setTeamDetails}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
}

export default TeamMemberList;
