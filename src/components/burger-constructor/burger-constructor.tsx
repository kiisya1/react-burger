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
import { getUser } from '../../services/user/reducer';
import { useNavigate, useLocation } from 'react-router-dom';
import { TUser } from '../../models/user.model';

export const BurgerConstructor = (): React.JSX.Element => {
	const orderPrice: number = useAppSelector(getOrderPrice);
	const user: TUser | null = useAppSelector(getUser);
	const navigate = useNavigate();
	const location = useLocation();
	const orderIngredients: string[] | undefined =
		useAppSelector(getOrderIngredients);
	const { order, loading, error } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();

	const closeModal = useCallback((): void => {
		dispatch(clearOrderNumber());
	}, [dispatch]);

	const onCreateOrderClick = useCallback(
		(event: SyntheticEvent): void => {
			event.preventDefault();
			if (!user) {
				navigate('/login', { state: { from: location } });
			} else {
				orderIngredients && dispatch(createOrder(orderIngredients));
			}
		},
		[dispatch, location, navigate, orderIngredients, user]
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
			{(loading || order || error) && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};
