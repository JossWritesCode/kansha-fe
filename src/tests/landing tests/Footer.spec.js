import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/Landing/Footer';

Enzyme.configure({ adapter: new Adapter() });

describe('Footer Component', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Footer />);

		expect(wrapper.exists()).toBe(true);
	});

	it('renders the Kansha wordmark', () => {
		const wrapper = shallow(<Footer />);

		expect(wrapper.find('.lp-brand__name').text()).toEqual('Kansha');
	});

	it('renders a login button', () => {
		const wrapper = shallow(<Footer />);

		expect(wrapper.find("[data-test='login']").text()).toEqual('Login');
	});
});
