import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import TotalRecognitionChart from './TotalRecognitionChart';

const COLORS = ['rgba(201, 23, 87, 0.15)', 'rgba(201, 23, 87, 1)'];

const OPTIONS = {
	aspectRatio: 1,
	responsive: true,
	cutoutPercentage: 90,
	legend: false,
};

const chartData = (labels, percent) => ({
	labels,
	datasets: [
		{
			data: percent == null ? [100, 0] : [100 - percent, percent],
			backgroundColor: COLORS,
			hoverBackgroundColor: COLORS,
		},
	],
});

const getEngagement = (person, time) =>
	axiosWithAuth()
		.get(`/reports/engagement?person=${person}&time=${time}`)
		.then((res) => res.data.percentThanked);

/* Share of employees who received / sent a recognition in the period */
const DoughnutCharts = ({ doughnutFilter }) => {
	const [percentThanked, setPercentThanked] = useState(null);
	const [percentThankful, setPercentThankful] = useState(null);

	useEffect(() => {
		let cancelled = false;
		Promise.all([
			getEngagement('recipient', doughnutFilter),
			getEngagement('sender', doughnutFilter),
		])
			.then(([thanked, thankful]) => {
				if (cancelled) return;
				setPercentThanked(thanked);
				setPercentThankful(thankful);
			})
			.catch(() => {
				if (cancelled) return;
				setPercentThanked(null);
				setPercentThankful(null);
			});
		return () => {
			cancelled = true;
		};
	}, [doughnutFilter]);

	return (
		<div className="doughnut-charts">
			<TotalRecognitionChart
				percent={percentThankful}
				data={chartData(
					['Percent Not Thankful', 'Percent Thankful'],
					percentThankful,
				)}
				options={OPTIONS}
				text="Recognitions sent"
			/>
			<TotalRecognitionChart
				percent={percentThanked}
				data={chartData(
					['Percent Not Thanked', 'Percent Thanked'],
					percentThanked,
				)}
				options={OPTIONS}
				text="Recognitions received"
			/>
		</div>
	);
};

export default DoughnutCharts;
