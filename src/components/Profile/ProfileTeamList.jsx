import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { selectProfile } from '../../store/selectors';
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch';
import Member from '../AdminTeams/Member';
import OrgEmployees from '../AdminTeams/OrgEmployees';
import Dropdown from '../Onboarding/DropDown';

/*
	On the user's dashboard: the members of one of their teams, or, if they
	aren't on a team, a searchable list of everyone in the organization.
*/
function ProfileTeamList() {
	const profile = useSelector(selectProfile);
	const teams = profile.teams?.length ? profile.teams : null;

	const [selectedTeam, setSelectedTeam] = useState(teams?.[0].team_id);
	const [teamDetails, setTeamDetails] = useState(null);
	const [filter, setFilter] = useState('');

	const orgSearch = useEmployeeSearch(filter, { enabled: !teams });

	useEffect(() => {
		if (!selectedTeam) return;
		let cancelled = false;
		axiosWithAuth()
			.get(`/teams/${selectedTeam}?limit=100`)
			.then(({ data }) => {
				if (!cancelled) setTeamDetails(data);
			})
			.catch(() => {
				if (!cancelled) setTeamDetails(null);
			});
		return () => {
			cancelled = true;
		};
	}, [selectedTeam]);

	return (
		<section className="teams-dashboard members-panel">
			<h2 className="teams-dashboard-title">
				{teams ? 'Teams' : `${profile.org_name} Members`}
			</h2>
			<div className="directory">
				<div className="directory-header">
					{teams && (
						<div className="dropdown-time-div">
							<Dropdown
								placeholder={teams[0].name}
								classNombre="custom-select dashboard"
								setSelection={setSelectedTeam}
							>
								{teams.map((team) => (
									<option
										key={team.team_id}
										value={team.team_id}
									>
										{team.name}
									</option>
								))}
							</Dropdown>
						</div>
					)}
					<div className="employee-filter-container">
						<span className="filter-label">Filter:</span>
						<button
							type="button"
							className="btn-filter is-active"
							aria-pressed="true"
						>
							Members
						</button>
					</div>
					{!teams && (
						<div className="directory-tools">
							<div className="employee-search-container">
								<input
									value={filter}
									onChange={(event) =>
										setFilter(event.target.value)
									}
									type="text"
									id="search"
									name="search"
									aria-label="Search for member"
									placeholder="Search for member"
								/>
							</div>
						</div>
					)}
				</div>
				<table className="team-member-table">
					<tbody>
						{teams
							? teamDetails?.team_members?.map((member) => (
									<Member
										key={member.member_id || member.id}
										member={member}
										teamDetails={teamDetails}
										setTeamDetails={setTeamDetails}
									/>
								))
							: orgSearch.employees.map((member) => (
									<OrgEmployees
										key={member.id}
										employee={member}
										onDashboard
									/>
								))}
					</tbody>
				</table>
				{!teams && orgSearch.hasMore && (
					<button
						type="button"
						className="btn-filter show-more"
						onClick={orgSearch.loadMore}
						disabled={orgSearch.isLoading}
					>
						Show more
					</button>
				)}
			</div>
		</section>
	);
}

export default ProfileTeamList;
