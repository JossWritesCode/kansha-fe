import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

/* Confirms removing an employee from the organization. Rendered in a Modal. */
const ConfirmDelete = ({ name, id, setTeam, close }) => {
	const [error, setError] = useState(null);

	const handleConfirm = async (e) => {
		e.preventDefault();
		try {
			await axiosWithAuth().delete(`/employees/${id}`);
			close(false);
			setTeam((prev) => prev.filter((emp) => emp.id !== id));
		} catch {
			setError(`Couldn't remove ${name}. Try again.`);
		}
	};

	return (
		<section className="delete-modal">
			<p>
				Are you sure you would like to remove {name} from your
				organization?
			</p>
			{error && <p role="alert">{error}</p>}
			<button onClick={handleConfirm}>Confirm</button>
			<button onClick={() => close(false)}>Cancel</button>
		</section>
	);
};

export default ConfirmDelete;
