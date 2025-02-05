import styles from './modal-overlay.module.scss';

export const ModalOverlay = (props: { onClick: () => void }) => {
	return <div onClick={() => props.onClick()} className={styles.overlay}></div>;
};
