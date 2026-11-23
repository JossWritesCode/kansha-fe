import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../store/actions/user-actions';
import { selectProfile } from '../store/selectors';
import Modal from './Modal';
import FileUpload from './FileUpload';

function Settings() {
	const profile = useSelector(selectProfile);
	const isUpdating = useSelector((state) => state.user.isUpdating);
	const dispatch = useDispatch();

	const [form, setForm] = useState({ first_name: '', last_name: '' });
	const [modal, setModal] = useState(false);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		setForm({
			first_name: profile.first_name || '',
			last_name: profile.last_name || '',
		});
	}, [profile.first_name, profile.last_name]);

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
		setStatus(null);
	};

	const isValid = form.first_name.trim() && form.last_name.trim();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isValid) return;
		const ok = await dispatch(
			update(profile.id, {
				first_name: form.first_name.trim(),
				last_name: form.last_name.trim(),
			}),
		);
		setStatus(
			ok
				? { ok, text: 'Changes saved.' }
				: { ok, text: "Couldn't save your changes. Try again." },
		);
	};

	return (
		<main id="settings">
			<h3>Settings</h3>
			<section>
				<h4>Edit Profile</h4>
				<form onSubmit={handleSubmit}>
					<figure
						role="button"
						tabIndex={0}
						aria-label="Change profile picture"
						onClick={() => setModal(true)}
						onKeyDown={(e) => e.key === 'Enter' && setModal(true)}
					>
						<img src={profile.profile_picture} alt="user profile" />
					</figure>
					<div className="settings-names">
						<label className="settings-field">
							<span>First name</span>
							<input
								placeholder="e.g. Jane"
								name="first_name"
								onChange={handleChange}
								value={form.first_name}
							/>
						</label>
						<label className="settings-field">
							<span>Last name</span>
							<input
								placeholder="e.g. Doe"
								name="last_name"
								onChange={handleChange}
								value={form.last_name}
							/>
						</label>
					</div>
					<button
						className="btn-onboarding-confirm"
						type="submit"
						disabled={!isValid || isUpdating}
					>
						Save Changes
					</button>
					{status && (
						<p
							role="status"
							className={`settings-status ${
								status.ok ? 'is-success' : 'is-error'
							}`}
						>
							{status.text}
						</p>
					)}
				</form>
			</section>
			{modal && (
				<Modal close={setModal}>
					<FileUpload />
				</Modal>
			)}
		</main>
	);
}

export default Settings;
