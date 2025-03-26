import styles from './feed.module.scss';
import { OrdersList } from '../../components/orders-list/orders-list';
import { OrdersStatistic } from '../../components/orders-statistic/orders-statistic';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TOrder } from '../../models/order.model';
import {
	getError,
	getOrderList,
	getStatus,
} from '../../services/order-list/reducer';
import { WebsocketStatus } from '../../models/api.model';
import { connect, disconnect } from '../../services/order-list/actions';
import { wsOrdersUrl } from '../../constants/api.constants';

export const Feed = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const orders: TOrder[] = useAppSelector(getOrderList);
	const wsStatus: WebsocketStatus = useAppSelector(getStatus);
	const wsError: string | null = useAppSelector(getError);

	useEffect((): (() => void) => {
		dispatch(connect(wsOrdersUrl));
		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<main className={`${styles.main} pt-10 pb-10`}>
			<h1
				className={`${styles.title_container} text text_type_main-large mb-5 pl-5 pr-5`}>
				Лента заказов
			</h1>
			<div className={`${styles.container} pl-5 pr-5`}>
				<OrdersList
					hideStatus={true}
					ordersList={orders}
					status={wsStatus}
					error={wsError}
				/>
				<OrdersStatistic />
			</div>
		</main>
	);
};
