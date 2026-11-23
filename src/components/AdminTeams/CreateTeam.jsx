import React, { useMemo } from 'react';
import OrganizationEmployeesTable from './OrganizationEmployeesTable';
import { ReactComponent as RecognitionIcon } from '../../assets/TeamsIcons/recognition.svg';

export const TEAM_ROLES = ['Member', 'Manager'];

/* Pick employees and a name for a new team */
const CreateTeam = ({
	employees,
	teamMemberArray,
	setTeamMemberArray,
	toggleTeamMember,
	teamName,
	setTeamName,
}) => {
	const selectedIds = useMemo(
		() => new Set(teamMemberArray.map((tm) => tm.id)),
		[teamMemberArray],
	);

	const handleRoleChange = (e, id) => {
		const { value } = e.target;
		setTeamMemberArray((prev) =>
			prev.map((tm) => (tm.id === id ? { ...tm, team_role: value } : tm)),
		);
	};

	return (
		<div className="create-team-container">
			<div className="create-team-employees-list">
				<OrganizationEmployeesTable
					employees={employees}
					selectedIds={selectedIds}
					onToggle={toggleTeamMember}
				/>
			</div>
			<div className="create-team">
				<div className="create-team-add-name">
					<input
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
						type="text"
						id="save-team"
						name="name"
						aria-label="Team Name"
						placeholder="Team Name"
					/>
					<h2>{`Selected (${teamMemberArray.length})`}</h2>
				</div>
				<div className="create-team-picked"></div>
				<div className="added-team-list">
					{teamMemberArray.map((member) => (
						<table key={member.id}>
							<tbody>
								<tr className="teams-employee-card">
									<td className="teams-employee">
										<div className="teams-employee-info">
											<img
												src={member.profile_picture}
												alt=""
												className="teams-profile-picture"
											/>
											<h3>
												{member.first_name}{' '}
												{member.last_name}
											</h3>
										</div>
									</td>
									<td className="recognition-btn">
										<RecognitionIcon
											style={{
												height: '20px',
												width: '20px',
											}}
										/>
									</td>
									<td className="teams-container">
										<select
											aria-label={`${member.first_name}'s role`}
											onChange={(e) =>
												handleRoleChange(e, member.id)
											}
											value={member.team_role}
										>
											{TEAM_ROLES.map((role) => (
												<option key={role} value={role}>
													{role}
												</option>
											))}
										</select>
									</td>
									<td className="teams-container">
										<h3 className="teams">{`Teams (${
											member.team_count || 0
										})`}</h3>
									</td>
								</tr>
							</tbody>
						</table>
					))}
				</div>
			</div>
		</div>
	);
};

export default CreateTeam;
