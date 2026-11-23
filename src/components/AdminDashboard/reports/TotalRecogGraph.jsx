import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import { Line } from 'react-chartjs-2';

// Palette from src/SCSS/abstracts/_variables.scss
const COLORS = {
	line: '#B71952', // raspberry
	guide: '#EFEBE6', // faint horizontal guides
	zero: '#C9C3BC', // the zero line: present, never the loudest thing
	label: '#595866', // secondary ink
	tooltip: '#171831', // ink
};
const FONT = "'Lato', 'Helvetica Neue', Arial, sans-serif";

function TotalRecogGraph({ lineFilter }) {
	const [graphData, setGraphData] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get(`/reports/range?time=${lineFilter}`)
			.then((res) => {
				setGraphData(Object.values(res.data.results).reverse());
				setLabels(Object.keys(res.data.results).reverse());
			})
			.catch(() => {
				setGraphData([]);
				setLabels([]);
			});
	}, [lineFilter]);

	const data = {
		labels: labels,
		datasets: [
			{
				data: graphData,
				borderColor: COLORS.line,
				borderWidth: 2,
				pointBackgroundColor: COLORS.line,
				pointHoverBackgroundColor: COLORS.line,
				pointHoverBorderColor: '#ffffff',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 5,
				pointHitRadius: 12,
				fill: false,
				// monotone never overshoots, so the line can't dip below zero
				cubicInterpolationMode: 'monotone',
				borderCapStyle: 'round',
			},
		],
	};

	const tickStyle = {
		fontColor: COLORS.label,
		fontFamily: FONT,
		fontSize: 12,
	};

	return (
		<div className="Chart">
			<Line
				data={data}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					title: {
						fontSize: 18,
						display: false,
						text: 'Total Organization Recognitions',
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
								},
								ticks: { ...tickStyle, padding: 6 },
							},
						],
						yAxes: [
							{
								gridLines: {
									color: COLORS.guide,
									drawBorder: false,
									drawTicks: false,
									zeroLineColor: COLORS.zero,
									zeroLineWidth: 1,
								},
								scaleLabel: {
									display: true,
									labelString: 'Number of Recognitions',
									fontColor: COLORS.label,
									fontFamily: FONT,
									fontSize: 12,
								},
								ticks: {
									...tickStyle,
									padding: 8,
									beginAtZero: true,
									stepSize: 1,
								},
							},
						],
					},
					legend: false,
					tooltips: {
						backgroundColor: COLORS.tooltip,
						titleFontFamily: FONT,
						bodyFontFamily: FONT,
						displayColors: false,
						cornerRadius: 6,
						xPadding: 10,
						yPadding: 8,
					},
					elements: {
						point: {
							radius: 0,
						},
					},
				}}
			/>
		</div>
	);
}
export default TotalRecogGraph;
