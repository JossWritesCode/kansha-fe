import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { finishLogin } from '../../store/actions/user-actions';
import { ReactComponent as SettingsIcon } from '../../assets/TeamsIcons/teamsettings.svg';
import { ReactComponent as TeamsIcon } from '../../assets/TeamsIcons/Vector.svg';
import { ReactComponent as RecognitionIcon } from '../../assets/TeamsIcons/recognition.svg';
import Modal from '../Modal';
import RecogModal from '../RecogModal/index';
import DeleteModal from './DeleteModal';

function Team({ name, id, managers, count, setTeams }) {
	const [recogModal, setRecogModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [error, setError] = useState(null);
	const history = useHistory();
	const dispatch = useDispatch();
	// The recognition button thanks the team's (first) manager
	const manager = managers[0];

	const handleDeleteTeam = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.delete(`/teams/${id}`)
			.then(() => {
				setDeleteModal(false);
				setTeams((previous) =>
					previous.filter((team) => team.id !== id),
				);
				// Reload the profile so the user's own team list is up to date
				finishLogin(dispatch);
			})
			.catch(() => {
				setDeleteModal(false);
				setError("Couldn't remove this team. Try again.");
			});
	};

	return (
		<>
			{deleteModal && (
				<DeleteModal
					setDeleteModal={setDeleteModal}
					deleteTeamFromOrg
					handleDeleteTeam={handleDeleteTeam}
				/>
			)}
			{recogModal && manager && (
				<Modal close={setRecogModal}>
					<RecogModal profile={manager} />
				</Modal>
			)}
			<tr className="team-list-table">
				<td className="team-name">
					<h3>{name}</h3>
					{error && <p role="alert">{error}</p>}
				</td>
				<td className="team-icons">
					<SettingsIcon style={{ cursor: 'pointer' }} />
					<TeamsIcon
						aria-label={`View ${name}`}
						onClick={() => history.push(`/teams/${id}`)}
						style={{ cursor: 'pointer' }}
					/>
				</td>
				<td className="manager-container">
					{manager && (
						<RecognitionIcon
							aria-label={`Recognize ${manager.first_name}`}
							onClick={() => setRecogModal(true)}
							style={{
								height: '20px',
								width: '20px',
								marginRight: '10px',
								cursor: 'pointer',
							}}
						/>
					)}
					<h5>
						Manager:{' '}
						{managers.map((mgr) => mgr.first_name).join(', ') ||
							'None'}
					</h5>
				</td>
				<td>
					<h5>{`Members (${count})`}</h5>
				</td>
				<td>
					<button
						className="btn-remove"
						onClick={() => setDeleteModal(true)}
					>
						Remove
					</button>
				</td>
			</tr>
		</>
	);
}

export default Team;
