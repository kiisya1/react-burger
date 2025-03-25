import React, { useMemo } from 'react';
import styles from './orders-list.module.scss';
import { TIngredient } from '../../models/ingredient.model';
import { TOrder } from '../../models/order.model';
import { useAppSelector } from '../../utils/hooks';
import { OrderItem } from './order-item/order-item';
import { WebsocketStatus } from '../../models/api.model';
import { AppLoading } from '../app-loading/app-loading';

type TOrdersList = {
	hideStatus?: boolean;
	ordersList: TOrder[];
	status: WebsocketStatus;
	error: string | null;
};

export const OrdersList = ({
	hideStatus,
	ordersList,
	status,
	error,
}: TOrdersList): React.JSX.Element => {
	const ingredientsMap: Record<string, TIngredient> = useAppSelector(
		(state) => state.ingredients.ingredientsMap
	);
	const orders: TOrder[] = useMemo(() => {
		return ordersList.filter(
			(item: TOrder) =>
				item.ingredients?.length &&
				item.ingredients.every((id: string) => !!ingredientsMap[id])
		);
	}, [ordersList, ingredientsMap]);

	if (status === WebsocketStatus.CONNECTING) {
		return (
			<div className={styles.loading}>
				<AppLoading />;
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.loading}>
				<p className='text text_type_main-medium' style={{ color: 'red' }}>
					`Во время загрузки заказов произошла ошибка: {error}.`
				</p>
			</div>
		);
	}

	return (
		<ul
			className={`${styles.orders} ${
				hideStatus ? '' : styles.padding
			} custom-scroll`}>
			{orders.map((order: TOrder) => {
				return (
					<li
						key={order.number}
						className={`${styles.order} ${
							hideStatus ? styles.margin : ''
						} p-6`}>
						<OrderItem hideStatus={hideStatus} order={order} />
					</li>
				);
			})}
		</ul>
	);
};
