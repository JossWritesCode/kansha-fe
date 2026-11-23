import React, {
	useRef,
	useEffect,
	Children,
	cloneElement,
	isValidElement,
} from 'react';

const FADE_STEP = 0.1;

/* Steps an element's opacity towards 1 (direction 1) or 0 (direction -1) */
const animate = (elRef, frameRef, direction, onDone) => {
	cancelAnimationFrame(frameRef.current);
	const step = () => {
		const el = elRef.current;
		if (!el) return;
		const next = parseFloat(el.style.opacity) + direction * FADE_STEP;
		if (next >= 1 || next <= 0) {
			el.style.opacity = next >= 1 ? 1 : 0;
			if (onDone) onDone();
			return;
		}
		el.style.opacity = next;
		frameRef.current = requestAnimationFrame(step);
	};
	step();
};

/*
	Fades in on mount and out on close. Each child component receives
	`close`, so content can close the modal itself.
*/
const Modal = ({ close, children }) => {
	const modal = useRef(null);
	const frame = useRef(null);

	useEffect(() => {
		// Read the latest frame id at cleanup: that's the one to cancel
		const frameRef = frame;
		animate(modal, frameRef, 1);
		return () => cancelAnimationFrame(frameRef.current);
	}, []);

	const closeModal = () => animate(modal, frame, -1, () => close(false));

	// Pass `close` to components only; DOM elements would warn about it
	const mappedChildren = Children.map(children, (child) =>
		isValidElement(child) && typeof child.type !== 'string'
			? cloneElement(child, { close })
			: child,
	);

	return (
		<div className="modal" ref={modal} style={{ opacity: 0 }}>
			<div role="presentation" onClick={closeModal} />
			<section>
				<button
					type="button"
					className="modal-close"
					aria-label="Close"
					onClick={closeModal}
				>
					&#9587;
				</button>
				{mappedChildren}
			</section>
		</div>
	);
};

export default Modal;
