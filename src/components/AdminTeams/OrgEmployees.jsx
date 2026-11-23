import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useBadges } from '../../hooks/useBadges';
import { ReactComponent as DeleteIcon } from '../../assets/TeamsIcons/delete.svg';
import { ReactComponent as RecognitionIcon } from '../../assets/TeamsIcons/recognition.svg';
import Modal from '../Modal';
import RecogModal from '../RecogModal/index';
import DeleteModal from './DeleteModal';
import ProfileModal from '../FeedSideBar/ProfileModal';

/*
	One employee row.
	- `selectable`: show a checkbox (creating a team); `onToggle` flips it.
	- `deletable`: admins can remove the employee from the organization.
	- `onDashboard`: the compact list on a user's dashboard.
*/
const OrgEmployees = ({
	employee,
	selectable = false,
	selected = false,
	onToggle,
	deletable = false,
	setEmployees,
	onDashboard = false,
}) => {
	const { badges } = useBadges();
	const [recogModal, setRecogModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [profileModal, setProfileModal] = useState(false);
	const [error, setError] = useState(null);

	const handleDeleteOrgMember = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.delete(`/users/${employee.id}`)
			.then(() => {
				setDeleteModal(false);
				setEmployees((previous) =>
					previous.filter((emp) => emp.id !== employee.id),
				);
			})
			.catch(() => {
				setDeleteModal(false);
				setError("Couldn't remove this member. Try again.");
			});
	};

	return (
		<>
			{deleteModal && (
				<DeleteModal
					setDeleteModal={setDeleteModal}
					deleteMemberFromOrg
					handleDeleteOrgMember={handleDeleteOrgMember}
				/>
			)}
			{profileModal && (
				<ProfileModal
					close={() => setProfileModal(false)}
					badges={badges}
					profileId={employee.id}
					inModal={false}
				/>
			)}
			<tr className="teams-employee-card">
				<td className="teams-employee">
					{selectable && !onDashboard && (
						<label>
							<input
								type="checkbox"
								className="css-checkbox"
								aria-label={`Add ${employee.first_name} to the team`}
								checked={selected}
								onChange={() => onToggle(employee)}
							/>
							<i></i>
						</label>
					)}
					<button
						type="button"
						className="teams-employee-link"
						onClick={() => setProfileModal(true)}
					>
						<div className="teams-employee-info">
							<img
								src={employee.profile_picture}
								alt=""
								className="teams-profile-picture"
							/>
							<h3>
								{employee.first_name} {employee.last_name}
							</h3>
						</div>
					</button>
					{error && <p role="alert">{error}</p>}
				</td>
				<td className="teams-employee-details">
					<h3 className="job-title">{employee.job_title}</h3>
				</td>
				<td className="teams-container">
					<h3 className="teams">{`Teams (${employee.team_count || 0})`}</h3>
				</td>
				<td className="recognition-btn">
					<button
						type="button"
						className="icon-btn icon-btn--recognize"
						aria-label={`Recognize ${employee.first_name}`}
						title={`Recognize ${employee.first_name}`}
						onClick={() => setRecogModal(true)}
					>
						<RecognitionIcon aria-hidden="true" focusable="false" />
					</button>
					{recogModal && (
						<Modal close={setRecogModal}>
							<RecogModal profile={employee} />
						</Modal>
					)}
				</td>
				<td className="teams-employee-icons">
					{deletable && (
						<button
							type="button"
							className="icon-btn icon-btn--delete"
							aria-label={`Remove ${employee.first_name}`}
							title={`Remove ${employee.first_name}`}
							onClick={() => setDeleteModal(true)}
						>
							<DeleteIcon aria-hidden="true" focusable="false" />
						</button>
					)}
				</td>
			</tr>
		</>
	);
};

export default OrgEmployees;
