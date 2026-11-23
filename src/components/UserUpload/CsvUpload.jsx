import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { ReactComponent as CloudUpload } from '../../assets/cloud-upload.svg';

/* Adds employees from a CSV file (template in public/files) */
function CsvUpload({ buttonClassName }) {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [userArray, setUserArray] = useState([]);
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		setMessage('');
		if (acceptedFiles.length) {
			setFile(acceptedFiles[0]);
			setError('');
		} else if (rejectedFiles.length) {
			setFile(null);
			setError('Please choose a CSV file.');
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: '.csv, text/csv, application/vnd.ms-excel',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('bulkupload', file);
		setIsUploading(true);
		setError('');
		try {
			const { data: result } = await axiosWithAuth().post('/csv', data);
			setUserArray(result.userArray || []);
			setMessage(result.message);
			setFile(null);
		} catch (err) {
			setError(
				err.response?.data?.error ||
					"Couldn't upload that file. Try again.",
			);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="bulk-upload-container">
			<h2 className="bulk-upload-title">Upload your spreadsheet.</h2>
			<div className="bulk-template-download">
				<a href="/files/bulk_employee_upload_template.csv" download>
					<p>Download sample format</p>
				</a>
			</div>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<CloudUpload />
				<p>
					Drag and drop file or <span>browse</span>
				</p>
			</div>
			<div className="file-preview">{file?.name}</div>
			{error && <p role="alert">{error}</p>}
			<div>
				{file && (
					<button
						className={buttonClassName}
						onClick={handleSubmit}
						disabled={isUploading}
					>
						Upload
					</button>
				)}
			</div>
			{userArray.length > 0 && (
				<>
					<h6>{message}</h6>
					<div className="bulk-success-container-names">
						<table>
							<thead>
								<tr>
									<th>First name</th>
									<th>Last name</th>
									<th>Email</th>
								</tr>
							</thead>
							<tbody>
								{userArray.map((person) => (
									<tr key={person.email}>
										<td>{person.first_name}</td>
										<td>{person.last_name}</td>
										<td>{person.email}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}

export default CsvUpload;
