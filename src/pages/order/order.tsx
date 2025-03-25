import React from 'react';
import styles from './order.module.scss';
import { OrderInfo } from '../../components/orders-list/order-info/order-info';
import { useParams } from 'react-router-dom';

export const Order = (): React.JSX.Element => {
	const { id } = useParams<'id'>();
	return (
		<div className={styles.wrapper}>
			<h2 className={`${styles.header} text text_type_digits-default`}>
				#{id}
			</h2>
			<OrderInfo />
		</div>
	);
};
