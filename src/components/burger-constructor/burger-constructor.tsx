import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from './constructor-list/constructor-list';
import styles from './burger-constructor.module.scss';
import { Modal } from '../modal/modal';
import React, { SyntheticEvent, useCallback } from 'react';
import { OrderDetails } from './order-details/order-details';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import {
	getOrderIngredients,
	getOrderPrice,
} from '../../services/burger-constructor/reducer';
import { createOrder } from '../../services/order/actions';
import { clearOrderNumber } from '../../services/order/reducer';

export const BurgerConstructor = () => {
	const orderPrice = useAppSelector(getOrderPrice);
	const orderIngredients: string[] | undefined =
		useAppSelector(getOrderIngredients);
	const { order, loading, error } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();

	const closeModal = useCallback(() => {
		dispatch(clearOrderNumber());
	}, [dispatch]);

	const onCreateOrderClick = useCallback(
		(event: SyntheticEvent) => {
			event.preventDefault();
			orderIngredients && dispatch(createOrder(orderIngredients));
		},
		[dispatch, orderIngredients]
	);

	return (
		<section className={`${styles.burger_constructor} pl-4`}>
			<ConstructorList />
			<section className={`${styles.burger_constructor__total}`}>
				<p className='text text_type_digits-medium'>
					{orderPrice} <CurrencyIcon type='primary' />
				</p>
				<Button
					onClick={onCreateOrderClick}
					htmlType='button'
					type='primary'
					disabled={loading || !orderIngredients?.length}
					size='large'>
					Оформить заказ
				</Button>
			</section>
			{error && (
				<p className='text text_type_digits-medium' style={{ color: 'red' }}>
					`Во время оформления заказа произошла ошибка: ${error}.`
				</p>
			)}
			{order && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};
