import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { selectIsAdmin } from '../../store/selectors';
import { useBadges } from '../../hooks/useBadges';
import Modal from '../Modal';
import RecogModal from '../RecogModal/index';
import ProfileModal from '../FeedSideBar/ProfileModal';
import DeleteModal from './DeleteModal';
import { ReactComponent as DeleteIcon } from '../../assets/TeamsIcons/delete.svg';
import { ReactComponent as RecognitionIcon } from '../../assets/TeamsIcons/recognition.svg';

/* One row in a team's member list */
function Member({ member, teamDetails, setTeamDetails }) {
	const isAdmin = useSelector(selectIsAdmin);
	const { badges } = useBadges();
	const [recogModal, setRecogModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [profileModal, setProfileModal] = useState(false);
	const [error, setError] = useState(null);

	const handleDeleteTeamMember = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.delete(`/teams/members/${member.member_id}`)
			.then(() => {
				setDeleteModal(false);
				setTeamDetails((previous) => ({
					...previous,
					team_members: previous.team_members.filter(
						(tm) => tm.member_id !== member.member_id,
					),
				}));
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
					handleDeleteTeamMember={handleDeleteTeamMember}
				/>
			)}
			{profileModal && (
				<ProfileModal
					close={() => setProfileModal(false)}
					badges={badges}
					profileId={member.id}
				/>
			)}
			<tr className="indiv-team">
				<td className="member-person">
					<button
						type="button"
						className="teams-employee-link teams-employee-info"
						onClick={() => setProfileModal(true)}
					>
						<img
							src={member.profile_picture}
							alt=""
							className="teams-profile-picture"
						/>
						<h3>
							{member.first_name} {member.last_name}
						</h3>
					</button>
					{error && <p role="alert">{error}</p>}
				</td>
				<td className="recognition-btn">
					<button
						type="button"
						className="icon-btn icon-btn--recognize"
						aria-label={`Recognize ${member.first_name}`}
						title={`Recognize ${member.first_name}`}
						onClick={() => setRecogModal(true)}
					>
						<RecognitionIcon aria-hidden="true" focusable="false" />
					</button>
					{recogModal && (
						<Modal close={setRecogModal}>
							<RecogModal profile={member} />
						</Modal>
					)}
				</td>
				<td className="member-role">
					<h3>{member.team_role}</h3>
				</td>
				<td className="member-team">
					<h3>{teamDetails.name}</h3>
				</td>
				{isAdmin && (
					<td className="icons">
						<button
							type="button"
							className="icon-btn icon-btn--delete"
							aria-label={`Remove ${member.first_name} from the team`}
							title={`Remove ${member.first_name} from the team`}
							onClick={() => setDeleteModal(true)}
						>
							<DeleteIcon aria-hidden="true" focusable="false" />
						</button>
					</td>
				)}
			</tr>
		</>
	);
}

export default Member;
