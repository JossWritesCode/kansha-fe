import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

import RecogList from './RecogList';
import LimitDropdown from './LimitDropdown';

// Wording for the empty message, by the selected period
const PERIOD = {
	weeks: 'this week',
	months: 'this month',
	years: 'this year',
};

function LeadershipBoard({ type, title, filter }) {
	const [rank, setRank] = useState([]);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(5);
	// Only a successful, empty response shows the empty message
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(false);
		axiosWithAuth()
			.get(`/reports/top?type=${type}&limit=${limit}&time=${filter}`)
			.then((res) => {
				setRank(res.data.employees);
				setCount(res.data.count);
				setLoaded(true);
			})
			.catch(() => {
				setRank([]);
				setCount(0);
			});
	}, [type, filter, limit]);

	const isEmpty = loaded && !rank?.length;

	return (
		<div className="most-recog-container">
			<div className="most-recog-title-container">
				<h3>{title}</h3>
				<LimitDropdown limit={limit} handleLimit={setLimit} />
			</div>

			{isEmpty ? (
				<p className="leaderboard-empty">
					No recognitions {PERIOD[filter] || 'yet'}.
				</p>
			) : (
				<RecogList rank={rank} count={count} />
			)}
		</div>
	);
}
export default LeadershipBoard;
