import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

import RecogList from './RecogList';
import LimitDropdown from './LimitDropdown';

function LeadershipBoard({ type, title, filter }) {
	const [rank, setRank] = useState([]);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(5);

	useEffect(() => {
		axiosWithAuth()
			.get(`/reports/top?type=${type}&limit=${limit}&time=${filter}`)
			.then((res) => {
				setRank(res.data.employees);
				setCount(res.data.count);
			})
			.catch(() => {
				setRank([]);
				setCount(0);
			});
	}, [type, filter, limit]);

	return (
		<div className="most-recog-container">
			<div className="most-recog-title-container">
				<h3>{title}</h3>
				<LimitDropdown limit={limit} handleLimit={setLimit} />
			</div>

			<RecogList rank={rank} count={count} />
		</div>
	);
}
export default LeadershipBoard;
