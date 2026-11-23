import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { finishLogin } from '../../store/actions/user-actions';
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch';
import OrganizationEmployeesTable from './OrganizationEmployeesTable';
import OrganizationTeams from './OrganizationTeams';
import CreateTeam from './CreateTeam';

// Which table the page shows
const EMPLOYEES = 'employees';
const CREATE_TEAM = 'create';
const TEAMS = 'teams';

const byName = (a, b) => a.name.localeCompare(b.name);

const OrganizationHome = () => {
	const [view, setView] = useState(EMPLOYEES);
	const [filter, setFilter] = useState('');
	const { employees, setEmployees, count, hasMore, loadMore, isLoading } =
		useEmployeeSearch(filter);

	const [teams, setTeams] = useState([]);
	const [teamMemberArray, setTeamMemberArray] = useState([]);
	const [teamName, setTeamName] = useState('');
	const [error, setError] = useState(null);

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		axiosWithAuth()
			.get('/teams/')
			.then((res) => setTeams([...res.data].sort(byName)))
			.catch(() => setError("Couldn't load your teams."));
	}, []);

	const toggleTeamMember = (employee) =>
		setTeamMemberArray((prev) =>
			prev.some((tm) => tm.id === employee.id)
				? prev.filter((tm) => tm.id !== employee.id)
				: [
						...prev,
						{
							...employee,
							user_id: employee.id,
							team_role: 'Member',
						},
					],
		);

	const canSave = teamName.trim() && teamMemberArray.length > 0;

	const handleSubmit = () => {
		if (!canSave) return;
		setError(null);
		axiosWithAuth()
			.post('/teams', {
				name: teamName.trim(),
				newMembersArray: teamMemberArray,
			})
			.then((res) => {
				// Reload the profile so the user's own team list is up to date
				finishLogin(dispatch);
				history.push(`/teams/${res.data.id}`);
			})
			.catch(() => setError("Couldn't create the team. Try again."));
	};

	const showEmployees = () => setView(EMPLOYEES);
	const isTeams = view === TEAMS;
	const hiddenInTeams = isTeams ? { visibility: 'hidden' } : undefined;

	return (
		<div className="teams-dashboard org-page">
			<div className="org-header">
				<h1>Organization</h1>
				<div className="add-team-container">
					{view === CREATE_TEAM ? (
						<button
							className="btn-org btn-org--primary"
							onClick={handleSubmit}
							disabled={!canSave}
						>
							Save
						</button>
					) : (
						<button
							className="btn-org btn-org--secondary"
							onClick={() => setView(CREATE_TEAM)}
						>
							Create a Team
						</button>
					)}
				</div>
			</div>
			<section className="directory">
				<div className="directory-header">
					<h2 className="members-number">
						{isTeams
							? `Teams (${teams.length})`
							: `Employees (${count})`}
					</h2>
					<div className="employee-filter-container">
						<span className="filter-label">Filter:</span>
						<button
							onClick={showEmployees}
							className={`btn-filter${isTeams ? '' : ' is-active'}`}
							aria-pressed={!isTeams}
						>
							Employees
						</button>
						<button
							onClick={() => setView(TEAMS)}
							className={`btn-filter${isTeams ? ' is-active' : ''}`}
							aria-pressed={isTeams}
						>
							Teams
						</button>
					</div>
					<div className="directory-tools" style={hiddenInTeams}>
						<div className="employee-search-container">
							<input
								value={filter}
								onChange={(event) =>
									setFilter(event.target.value)
								}
								type="text"
								id="search"
								name="search"
								aria-label="Search employees"
								placeholder="Search"
							/>
						</div>
						<button
							type="button"
							className="add-members-btn"
							onClick={() => history.push('/add-user')}
						>
							+ Add more members
						</button>
					</div>
				</div>
				{error && (
					<p className="directory-error" role="alert">
						{error}
					</p>
				)}

				{view === EMPLOYEES && (
					<OrganizationEmployeesTable
						employees={employees}
						setEmployees={setEmployees}
					/>
				)}
				{view === CREATE_TEAM && (
					<CreateTeam
						employees={employees}
						teamMemberArray={teamMemberArray}
						setTeamMemberArray={setTeamMemberArray}
						toggleTeamMember={toggleTeamMember}
						teamName={teamName}
						setTeamName={setTeamName}
					/>
				)}
				{isTeams && (
					<OrganizationTeams
						teams={teams}
						setTeams={setTeams}
						onCreateTeam={() => setView(CREATE_TEAM)}
					/>
				)}
				{!isTeams && hasMore && (
					<button
						type="button"
						className="btn-filter show-more"
						onClick={loadMore}
						disabled={isLoading}
					>
						Show more
					</button>
				)}
			</section>
		</div>
	);
};

export default OrganizationHome;
