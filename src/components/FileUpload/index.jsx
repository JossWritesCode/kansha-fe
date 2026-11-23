import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../store/actions/user-actions';
import 'react-image-crop/lib/ReactCrop.scss';

const MAX_SIZE = 500;

/* Draws the cropped part of `image` to a canvas and returns it as a JPEG blob */
const cropToBlob = (image, crop) => {
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = crop.width;
	canvas.height = crop.height;
	canvas
		.getContext('2d')
		.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height,
		);
	return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
};

/* Reads an image file and scales it down so its longest side is MAX_SIZE */
const readResized = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onload = (event) => {
			const img = new Image();
			img.onerror = reject;
			img.onload = () => {
				const scale = Math.min(
					1,
					MAX_SIZE / Math.max(img.width, img.height),
				);
				const canvas = document.createElement('canvas');
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;
				canvas
					.getContext('2d')
					.drawImage(img, 0, 0, canvas.width, canvas.height);
				resolve(canvas.toDataURL());
			};
			img.src = event.target.result;
		};
		reader.readAsDataURL(file);
	});

const FileUpload = ({ close }) => {
	const [src, setSrc] = useState(null);
	const [imageRef, setImageRef] = useState(null);
	const [crop, setCrop] = useState({ unit: '%', width: 60, aspect: 1 });
	const [blob, setBlob] = useState(null);
	const [error, setError] = useState(null);
	const isUploading = useSelector((state) => state.user.isUploading);
	const dispatch = useDispatch();

	const makeClientCrop = async (image, nextCrop) => {
		if (image && nextCrop.width && nextCrop.height) {
			setBlob(await cropToBlob(image, nextCrop));
		}
	};

	const onSelectFile = async (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			setError('Please choose an image file.');
			return;
		}
		setError(null);
		setBlob(null);
		try {
			setSrc(await readResized(file));
		} catch {
			setError("Couldn't read that image. Try another file.");
		}
	};

	const onImageLoaded = (image) => {
		setImageRef(image);
		makeClientCrop(image, crop);
	};

	const handleUpload = async () => {
		if (!blob) return;
		const data = new FormData();
		data.append('image', blob, 'profile.jpg');
		const ok = await dispatch(uploadPicture(data));
		if (ok) {
			if (close) close(false);
		} else {
			setError("Couldn't upload your picture. Try again.");
		}
	};

	return (
		<section id="file-upload">
			{src && (
				<ReactCrop
					src={src}
					crop={crop}
					circularCrop
					onImageLoaded={onImageLoaded}
					onComplete={(c) => makeClientCrop(imageRef, c)}
					onChange={setCrop}
				/>
			)}
			<input
				type="file"
				accept="image/png, image/jpeg, image/gif"
				onChange={onSelectFile}
				aria-label="upload photo"
			/>
			{error && <p role="alert">{error}</p>}
			<button
				type="button"
				onClick={handleUpload}
				disabled={!blob || isUploading}
				className="btn-onboarding-confirm"
			>
				{isUploading ? 'Uploading…' : 'Upload'}
			</button>
		</section>
	);
};

export default FileUpload;
