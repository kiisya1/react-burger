import styles from './modal-overlay.module.scss';
import React from 'react';

type TModalOverlay = {
	onClick: () => void;
};

export const ModalOverlay = (props: TModalOverlay): React.JSX.Element => {
	return (
		<div
			onClick={() => props.onClick()}
			className={styles.overlay}
			data-testid='modal-overlay'></div>
	);
};
