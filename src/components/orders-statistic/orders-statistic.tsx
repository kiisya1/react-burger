import React, { useMemo } from 'react';
import styles from './orders-statistic.module.scss';
import { TOrder } from '../../models/order.model';
import { useAppSelector } from '../../utils/hooks';
import {
	getOrderList,
	getTotal,
	getTotalToday,
} from '../../services/order-list/reducer';

const ordersInListCount = 10;

export const OrdersStatistic = (): React.JSX.Element => {
	const orders: TOrder[] = useAppSelector(getOrderList);
	const total: number = useAppSelector(getTotal);
	const totalToday: number = useAppSelector(getTotalToday);

	const inProgress: number[] = useMemo(() => {
		return orders
			.filter((item: TOrder) => item.status === 'pending')
			.map((item: TOrder) => item.number);
	}, [orders]);

	const ready: number[] = useMemo(() => {
		return orders
			.filter((item: TOrder) => item.status === 'done')
			.map((item: TOrder) => item.number);
	}, [orders]);

	return (
		<div className='mb-15'>
			<div className={`${styles.container} mb-15`}>
				<div>
					<p className='text text_type_main-medium mb-6'>Готовы:</p>
					<ul className={styles.list}>
						{ready
							.slice(
								0,
								ready.length > ordersInListCount
									? ordersInListCount
									: ready.length
							)
							.map((item: number) => {
								return (
									<li
										key={item}
										className={`${styles.item} ${styles.done} text text_type_digits-default`}>
										{item}
									</li>
								);
							})}
					</ul>
				</div>
				<div>
					<p className='text text_type_main-medium mb-6'>В работе:</p>
					<ul className={styles.list}>
						{inProgress
							.slice(
								0,
								inProgress.length > ordersInListCount
									? ordersInListCount
									: inProgress.length
							)
							.map((item: number) => {
								return (
									<li
										key={item}
										className={`${styles.item} text text_type_digits-default`}>
										{item}
									</li>
								);
							})}
					</ul>
				</div>
			</div>
			<p className='text text_type_main-medium'>Выполнено за все время:</p>
			<p
				className={`${styles.orders_quantity} text text_type_digits-large mb-15`}>
				{total}
			</p>
			<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
			<p className={`${styles.orders_quantity} text text_type_digits-large`}>
				{totalToday}
			</p>
		</div>
	);
};
