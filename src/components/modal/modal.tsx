import { createPortal } from 'react-dom';
import React, { useCallback, useEffect } from 'react';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalProps } from '../../models/modal.model';

export const Modal = (props: ModalProps) => {
	const onKeydown = useCallback(
		(event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				props.onClose();
			}
		},
		[props]
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeydown);
		return () => {
			window.removeEventListener('keydown', onKeydown);
		};
	}, [onKeydown]);

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
		document.body
	);
};
