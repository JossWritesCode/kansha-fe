import React, { useState } from 'react';
import TotalRecogGraph from './reports/TotalRecogGraph';
import DoughnutCharts from './reports/DoughnutCharts';
import LeaderShipBoard from './reports/LeadershipBoard';
import TimeDropdown from './reports/TimeDropdown';

export default function Reports() {
	const [filter, setFilter] = useState('weeks');
	const [lineFilter, setLineFilter] = useState('weeks');
	const [doughnutFilter, setDoughnutFilter] = useState('weeks');

	return (
		<div className="reports">
			<section className="container-total-recog-graph">
				<h2 className="analytics-title">Analytics</h2>
				<div className="title-container">
					<h3 className="recognition-title">Recognition</h3>
					<TimeDropdown
						annual="Annual"
						week="This week"
						month="This month"
						handleFilter={setLineFilter}
					/>
				</div>
				<TotalRecogGraph lineFilter={lineFilter} />
				<div className="title-container participation-container">
					<h3 className="participation-title">Participation</h3>
					<TimeDropdown
						annual="Annual"
						week="This week"
						month="This month"
						handleFilter={setDoughnutFilter}
					/>
				</div>
				<DoughnutCharts doughnutFilter={doughnutFilter} />
			</section>

			<section className="container-leaderboard">
				<div className="container-time-dropdown">
					<TimeDropdown
						handleFilter={setFilter}
						annual="Yearly leader board"
						week="Weekly leader board"
						month="Monthly leader board"
					/>
				</div>
				<LeaderShipBoard
					type="recipient"
					title="Most thanked"
					filter={filter}
				/>

				<LeaderShipBoard
					type="sender"
					title="Most thankful"
					filter={filter}
				/>
			</section>
		</div>
	);
}
