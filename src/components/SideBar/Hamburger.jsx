import React from 'react';

const Hamburger = ({ open }) => (
	<button
		className={`hamburger hamburger--arrow${open ? ' is-active' : ''}`}
		type="button"
		aria-label={open ? 'Collapse menu' : 'Expand menu'}
		aria-expanded={open}
	>
		<span className="hamburger-box" role="presentation">
			<span className="hamburger-inner" role="presentation" />
		</span>
	</button>
);

export default Hamburger;
