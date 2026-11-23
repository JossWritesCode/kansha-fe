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
		<div className="teams-dashboard">
			<div className="header">
				<h1>Organization</h1>
				<div className="add-team-container">
					{view === CREATE_TEAM ? (
						<button onClick={handleSubmit} disabled={!canSave}>
							Save
						</button>
					) : (
						<button onClick={() => setView(CREATE_TEAM)}>
							Create a Team
						</button>
					)}
				</div>
				<h2 className="members-number">
					{isTeams
						? `Teams (${teams.length})`
						: `Employees (${count})`}
				</h2>
			</div>
			<div className="employee-filter-container">
				<h3>Filter:</h3>
				<button onClick={showEmployees} className="btn-filter">
					Employees
				</button>
				<button onClick={() => setView(TEAMS)} className="btn-filter">
					Teams
				</button>
				{/* keeps the layout aligned */}
				<button
					className="btn-filter"
					style={{ opacity: 0 }}
					tabIndex={-1}
					aria-hidden="true"
				>
					Hidden
				</button>
				<div className="employee-search-container">
					<input
						style={hiddenInTeams}
						value={filter}
						onChange={(event) => setFilter(event.target.value)}
						type="text"
						id="search"
						name="search"
						aria-label="Search employees"
						placeholder="Search"
					/>
				</div>
			</div>
			<div className="select-add-members">
				<h3
					style={hiddenInTeams}
					onClick={() => history.push('/add-user')}
				>
					+ Add more members
				</h3>
			</div>
			{error && <p role="alert">{error}</p>}

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
					className="btn-filter"
					onClick={loadMore}
					disabled={isLoading}
				>
					Show more
				</button>
			)}
		</div>
	);
};

export default OrganizationHome;
