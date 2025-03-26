import React, { useEffect, useMemo } from 'react';
import { TIngredient } from '../../../models/ingredient.model';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.scss';
import { useParams } from 'react-router-dom';
import { TOrder } from '../../../models/order.model';
import { getOrder } from '../../../services/order/actions';
import { statusMap } from '../../../constants/order-status.constants';
import { AppLoading } from '../../app-loading/app-loading';

export const OrderInfo = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { id } = useParams<'id'>();
	const ingredientsMap: Record<string, TIngredient> = useAppSelector(
		(state) => state.ingredients.ingredientsMap
	);
	const order: TOrder | null = useAppSelector((state) => {
		let data =
			id && state.orderList.orders.find((item: TOrder) => item.number === +id);
		if (data) {
			return data;
		}

		data =
			id &&
			state.profileOrderList.orders.find((item: TOrder) => item.number === +id);
		if (data) {
			return data;
		}

		return state.order.order;
	});

	useEffect((): void => {
		if (!order && id) {
			dispatch(getOrder(id));
		}
	}, [dispatch, id, order]);

	const ingredientCountMap: Map<string, number> = useMemo(() => {
		const countMap: Map<string, number> = new Map<string, number>();
		if (order?.ingredients?.length) {
			order.ingredients.forEach((item: string) => {
				countMap.set(item, (countMap.get(item) ?? 0) + 1);
			});
		}
		return countMap;
	}, [order]);

	const price: number = useMemo(() => {
		if (order?.ingredients?.length) {
			return order?.ingredients.reduce(
				(sum: number, current: string) => sum + ingredientsMap[current].price,
				0
			);
		}
		return 0;
	}, [ingredientsMap, order]);

	if (!order) {
		return <AppLoading />;
	}

	return (
		<section className={`${styles.order_info}`}>
			<p className='text text_type_main-medium mt-5 mb-2'>{order?.name}</p>
			<p
				className={`${
					order.status === 'done' ? styles.active : ''
				} text text_type_main-default mb-15`}>
				{statusMap[order.status]}
			</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<ul className={`${styles.list} custom-scroll`}>
				{Array.from(ingredientCountMap.entries()).map(
					(item: [string, number]) => {
						return (
							<li className={styles.list_item} key={item[0]}>
								<div className={styles.image_container}>
									<img
										className={styles.image}
										src={ingredientsMap[item[0]].image_mobile}
										alt={ingredientsMap[item[0]].name}
									/>
								</div>
								<p className='text text_type_main-default'>
									{ingredientsMap[item[0]].name}
								</p>
								<p className={`${styles.price} text text_type_digits-default`}>
									{`${item[1]} x ${ingredientsMap[item[0]].price}`}
									<CurrencyIcon type='primary' />
								</p>
							</li>
						);
					}
				)}
			</ul>
			<div className={styles.info}>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</p>
				<p className={`${styles.price} text text_type_digits-default`}>
					{price} <CurrencyIcon type='primary' />
				</p>
			</div>
		</section>
	);
};
