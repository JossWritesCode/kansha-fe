import React, { useState } from 'react';
import { ReactComponent as AddMoreImg } from '../../assets/ic_outline-person-add.svg';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const EMPTY_EMPLOYEE = {
	first_name: '',
	last_name: '',
	email: '',
	job_title: '',
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trimAll = (employee) =>
	Object.fromEntries(
		Object.entries(employee).map(([key, value]) => [key, value.trim()]),
	);

/*
	Adds employees to the organization one at a time.
	With `onDone`, a "Next" button saves anything typed in, then calls it
	(used in onboarding).
*/
function EmployeeForm({ titleClassName = 'user-upload-title', onDone }) {
	const [employee, setEmployee] = useState(EMPTY_EMPLOYEE);
	const [added, setAdded] = useState([]);
	const [error, setError] = useState(null);
	const [isSaving, setIsSaving] = useState(false);

	const values = trimAll(employee);
	const isEmpty = Object.values(values).every((value) => !value);

	const handleEmployee = (e) => {
		setEmployee({ ...employee, [e.target.name]: e.target.value });
		setError(null);
	};

	// Resolves to true when the employee was saved
	const save = async () => {
		if (
			!values.first_name ||
			!values.last_name ||
			!EMAIL_PATTERN.test(values.email)
		) {
			setError('First name, last name and a valid email are required.');
			return false;
		}
		setIsSaving(true);
		try {
			await axiosWithAuth().post('/employees', {
				...values,
				user_type: 'Standard',
			});
			setAdded((prev) => [...prev, values]);
			setEmployee(EMPTY_EMPLOYEE);
			return true;
		} catch (err) {
			setError(
				err.response?.data?.error ||
					err.response?.data?.message ||
					"Couldn't add this employee. Try again.",
			);
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		save();
	};

	const handleDone = async () => {
		if (isEmpty || (await save())) onDone();
	};

	return (
		<div className="employee-add-container">
			<h2 className={titleClassName}>Employee information</h2>
			<form
				id="add-employee-form"
				name="add-employee-form"
				className="add-employee-form"
				onSubmit={handleSubmit}
			>
				<div className="name-container">
					<input
						className="formname"
						placeholder="First Name"
						aria-label="First Name"
						name="first_name"
						value={employee.first_name}
						onChange={handleEmployee}
					/>
					<input
						className="formname"
						placeholder="Last Name"
						aria-label="Last Name"
						name="last_name"
						value={employee.last_name}
						onChange={handleEmployee}
					/>
				</div>
				<input
					className="jobtitle-input"
					placeholder="Job Title"
					aria-label="Job Title"
					name="job_title"
					value={employee.job_title}
					onChange={handleEmployee}
				/>
				<input
					type="email"
					placeholder="Email"
					aria-label="Email"
					name="email"
					value={employee.email}
					onChange={handleEmployee}
				/>

				{error && <p role="alert">{error}</p>}

				<button
					type="submit"
					className="add-another-employee"
					disabled={isSaving}
				>
					<AddMoreImg className="AddMoreIcon" />
					{onDone ? 'Add more' : 'Add user'}
				</button>

				<div className="success-employee-add">
					{added.length > 0 && (
						<div>
							<h6>Added Successfully!</h6>
							{added.map((person) => (
								<p key={person.email}>
									{person.first_name} {person.last_name}{' '}
									<span className="employee-email">
										{person.email}
									</span>
								</p>
							))}
						</div>
					)}
				</div>
			</form>

			{onDone && (
				<button onClick={handleDone} disabled={isSaving}>
					Next
				</button>
			)}
		</div>
	);
}

export default EmployeeForm;
