import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

function S4AUserUpload() {
	const [uploadNow, setUploadNow] = useState('');
	const [uploadMethod, setUploadMethod] = useState('');

	let history = useHistory();

	const handleUploadNow = (e) => {
		setUploadNow(e.target.value);
	};

	const handleUploadMethod = (e) => {
		setUploadMethod(e.target.value);
	};

	const handleClick = () => {
		if (uploadNow === 'true' && uploadMethod === 'manual') {
			history.push('/onboarding/step-4b');
		} else if (uploadNow === 'true' && uploadMethod === 'bulk') {
			history.push('/onboarding/step-4c');
		} else {
			history.push('/onboarding/step-6');
		}
	};

	return (
		<>
			<div className="admin-user-add-container">
				<h2 className="user-upload-title">Add Employees</h2>
				<div className="admin-add-employee-form">
					<div className="upload-now-question">
						<h6>Would you like to add employees now?</h6>
						<div>
							<input
								type="radio"
								id="yes"
								name="upload-now"
								value="true"
								onChange={handleUploadNow}
							/>
							<label htmlFor="yes">Yes</label>
						</div>

						<div>
							<input
								type="radio"
								id="no"
								name="upload-now"
								value="false"
								onChange={handleUploadNow}
							/>
							<label htmlFor="no">No</label>
						</div>
					</div>

					{uploadNow === 'true' && (
						<div className="how-upload-question">
							<h6>How would you like to add them?</h6>
							<div>
								<input
									type="radio"
									id="manual"
									name="upload-method"
									value="manual"
									onChange={handleUploadMethod}
								/>
								<label htmlFor="manual">
									Manually enter employees{' '}
									<span className="gray-details">
										(not recommended for over 10 employees)
									</span>
								</label>
							</div>

							<div>
								<input
									type="radio"
									id="bulk"
									name="upload-method"
									value="bulk"
									onChange={handleUploadMethod}
								/>
								<label htmlFor="bulk">
									Bulk Upload{' '}
									<span className="gray-details">
										(click here to view a sample format for
										you spreadsheet or csv)
									</span>
								</label>
							</div>
						</div>
					)}
				</div>
			</div>

			<button onClick={handleClick}>Next</button>
		</>
	);
}

export default S4AUserUpload;
