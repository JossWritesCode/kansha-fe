import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Index from '../../components/Landing/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Components in index', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<Index />);

		expect(wrapper.exists()).toBe(true);
	});

	it('renders header, page sections, and footer', () => {
		const wrapper = shallow(<Index />);

		expect(wrapper.text()).toEqual(
			'<Header /><Main /><WhyKansha /><DidYouKnow /><ListOfFeatures /><ResultsYouCanSee /><Footer />',
		);
	});
});
