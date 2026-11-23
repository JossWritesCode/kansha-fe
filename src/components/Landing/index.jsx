import React from 'react';
import Header from './Header';
import Main from './Main';
import WhyKansha from './WhyKansha';
import DidYouKnow from './DidYouKnow';
import ListOfFeatures from './ListOfFeatures';
import ResultsYouCanSee from './ResultsYouCanSee';
import Footer from './Footer';

const Landing = () => {
	return (
		<div className="lp">
			<Header />
			<main>
				<Main />
				<WhyKansha />
				<DidYouKnow />
				<ListOfFeatures />
				<ResultsYouCanSee />
			</main>
			<Footer />
		</div>
	);
};

export default Landing;
