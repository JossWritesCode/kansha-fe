import React from 'react';
import { useLocation } from 'react-router-dom';

const STEPS = 6;

/* Onboarding progress, from the step number in the URL (/onboarding/step-N) */
const ProgressBar = () => {
	const { pathname } = useLocation();
	const match = pathname.match(/step-(\d+)/);
	const step = match ? Math.min(Number(match[1]), STEPS) : 0;
	return (
		<progress value={step} max={STEPS} aria-label="Onboarding progress" />
	);
};

export default ProgressBar;
