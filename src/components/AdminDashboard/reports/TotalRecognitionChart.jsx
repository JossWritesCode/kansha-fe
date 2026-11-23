import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TotalRecognitionChart = ({ data, options, percent, text }) => (
	<div className="doughnut-container">
		<div className="doughnut">
			<h3 className="doughnut-text">
				{Number.isFinite(percent) ? `${Math.round(percent)}%` : '—'}{' '}
				Participation
			</h3>
			{/* square canvas, so the ring fills its container */}
			<Doughnut data={data} options={options} width={140} height={140} />
		</div>
		<h5>{text}</h5>
	</div>
);

export default TotalRecognitionChart;
