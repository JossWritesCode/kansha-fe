import React from 'react';
import Team from './Team';

const OrganizationTeams = ({ teams, setTeams, onCreateTeam }) => {
	if (teams.length === 0) {
		return (
			<div className="empty-team-container">
				<h1>You currently have no teams to view.</h1>
				<button onClick={onCreateTeam} className="org-team-button">
					Create a Team
				</button>
			</div>
		);
	}

	return (
		<table className="org-team-container">
			<tbody>
				{teams.map((team) => (
					<Team
						key={team.id}
						id={team.id}
						name={team.name}
						managers={team.teamManagers || []}
						count={team.count}
						setTeams={setTeams}
					/>
				))}
			</tbody>
		</table>
	);
};

export default OrganizationTeams;
