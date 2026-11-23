import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectIsAdmin } from '../../store/selectors';
import { useEmployeeSearch } from '../../hooks/useEmployeeSearch';
import WorkspaceCard from './WorkspaceCard';

function Workspace() {
	const [filter, setFilter] = useState('');
	const history = useHistory();
	const isAdmin = useSelector(selectIsAdmin);
	const { employees, setEmployees, hasMore, loadMore, isLoading, error } =
		useEmployeeSearch(filter);

	return (
		<main className="workspace">
			<header>
				<h1>Workspace</h1>
				{isAdmin && (
					<button
						type="button"
						className="add-users-container"
						onClick={() => history.push('/add-user')}
					>
						<i
							id="add-user-icon"
							className="fas fa-user-plus"
							style={{ display: 'flex' }}
						></i>
						<p> Add Users</p>
					</button>
				)}
				<input
					placeholder="Search Workspace…"
					aria-label="Search Workspace"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					type="text"
				/>
			</header>
			{error && <p role="alert">Couldn't load your workspace.</p>}
			<ul className="workspace-card-container">
				{employees.map((user) => (
					<WorkspaceCard
						key={user.id}
						profile={user}
						isAdmin={isAdmin}
						setTeam={setEmployees}
					/>
				))}
			</ul>
			{hasMore && (
				<button
					type="button"
					className="btn-filter"
					onClick={loadMore}
					disabled={isLoading}
				>
					Show more
				</button>
			)}
		</main>
	);
}
export default Workspace;
