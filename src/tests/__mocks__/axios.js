/*
	Manual mock for axios. CRA resets mock implementations before every test
	(`resetMocks: true`), so the default responses are set in setupTests.js.
	`create` is a plain function so the reset can't break axiosWithAuth().
*/
const mockAxios = jest.createMockFromModule('axios');

mockAxios.create = () => mockAxios;

export default mockAxios;
