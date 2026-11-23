import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Landing/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Header />);

		expect(wrapper.exists()).toBe(true);
	});

	it('renders the Kansha wordmark', () => {
		const wrapper = shallow(<Header />);

		expect(wrapper.find('.lp-brand__name').text()).toBe('Kansha');
	});

	it('renders a login button', () => {
		const wrapper = shallow(<Header />);

		expect(wrapper.find("[data-test='login']").text()).toBe('Login');
	});
});
