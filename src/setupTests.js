import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import mockAxios from 'axios';

/*
	Default API responses. Tests override these with mockImplementation in
	their own beforeEach.
*/
beforeEach(() => {
	mockAxios.get.mockImplementation((url) =>
		Promise.resolve({ data: url === '/badges' ? [] : {} }),
	);
	mockAxios.post.mockImplementation(() => Promise.resolve({ data: {} }));
	mockAxios.put.mockImplementation(() => Promise.resolve({ data: {} }));
	mockAxios.delete.mockImplementation(() => Promise.resolve({ data: {} }));
});
