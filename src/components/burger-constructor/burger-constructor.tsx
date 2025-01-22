import { BurgerConstructorProps } from '../../models/burger-constructor.model';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from './constructor-list/constructor-list';
import styles from './burger-constructor.module.scss';
import { Modal } from '../modal/modal';
import React, { useCallback, useState } from 'react';
import { OrderDetails } from './order-details/order-details';

export const BurgerConstructor = (props: BurgerConstructorProps) => {
	const [modalOpen, setModalOpen]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);

	const closeModal = useCallback(() => {
		setModalOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setModalOpen(true);
	}, []);

	return (
		<section className={`${styles.burger_constructor} pl-4`}>
			<ConstructorList ingredients={props.ingredients} />
			<section className={`${styles.burger_constructor__total}`}>
				<p className='text text_type_digits-medium'>
					{'610'} <CurrencyIcon type='primary' />
				</p>
				<Button
					onClick={openModal}
					htmlType='button'
					type='primary'
					size='large'>
					Оформить заказ
				</Button>
			</section>
			{modalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};
