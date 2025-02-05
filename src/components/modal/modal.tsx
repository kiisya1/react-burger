import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalProps } from '../../models/modal.model';

const modalRoot = document.getElementById('modal-root');

export const Modal = (props: ModalProps) => {
	useEffect(() => {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				props.onClose();
			}
		};

		window.addEventListener('keydown', onKeydown);
		return () => {
			window.removeEventListener('keydown', onKeydown);
		};
	}, [props, props.onClose]);

	return createPortal(
		<>
			<div className={`${styles.modal} p-10`}>
				<header className={styles.modal__header}>
					<h2 className={`text ${props.titleStyle}`}>{props.title}</h2>
					<CloseIcon
						className={styles.modal__button}
						onClick={props.onClose}
						type='primary'
					/>
				</header>
				{props.children}
			</div>
			<ModalOverlay onClick={props.onClose} />
		</>,
		modalRoot ?? document.body
	);
};
