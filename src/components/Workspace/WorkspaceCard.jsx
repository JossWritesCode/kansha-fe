import React, { useState } from 'react';
import { ReactComponent as ProfileIcon } from '../../assets/profile.svg';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import { ReactComponent as TrashIcon } from '../../assets/Trashcan.svg';
import { useBadges } from '../../hooks/useBadges';
import Modal from '../Modal';
import RecogModal from '../RecogModal';
import ProfileModal from '../FeedSideBar/ProfileModal';
import ConfirmDelete from './ConfirmDelete';

export default function WorkspaceCard({ profile, isAdmin, setTeam }) {
	const { badges } = useBadges();
	const [recogModal, setRecogModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [profileModal, setProfileModal] = useState(false);
	const name = `${profile.first_name} ${profile.last_name}`;

	return (
		<li className="workspace-card">
			<section className="workspace-card-content">
				{isAdmin && (
					<>
						<button
							className="trash"
							aria-label={`Remove ${name}`}
							onClick={() => setDeleteModal(true)}
						>
							<TrashIcon />
						</button>
						{deleteModal && (
							<Modal close={setDeleteModal}>
								<ConfirmDelete
									name={name}
									id={profile.id}
									setTeam={setTeam}
								/>
							</Modal>
						)}
					</>
				)}
				<img alt="profile" src={profile.profile_picture} />
				<h5>{name}</h5>
				<h6>{profile.job_title}</h6>
				<h6>{profile.department}</h6>
			</section>
			<section className="workspace-card-icons">
				<button
					aria-label={`Send ${name} a recognition`}
					onClick={() => setRecogModal(true)}
				>
					<SendIcon />
				</button>
				<button
					aria-label={`View ${name}'s profile`}
					onClick={() => setProfileModal(true)}
				>
					<ProfileIcon />
				</button>
			</section>
			{recogModal && (
				<Modal close={setRecogModal}>
					<RecogModal profile={profile} />
				</Modal>
			)}
			{profileModal && (
				<ProfileModal
					close={() => setProfileModal(false)}
					badges={badges}
					profileId={profile.id}
					inModal={false}
				/>
			)}
		</li>
	);
}
