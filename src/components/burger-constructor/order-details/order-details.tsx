import styles from './order-details.module.scss';
import imgPath from '../../../../src/images/graphics.png';
import { useAppSelector } from '../../../utils/hooks';
import { AppLoading } from '../../app-loading/app-loading';
import React from 'react';

export const OrderDetails = (): React.JSX.Element => {
	const { createdOrder, loading, error } = useAppSelector(
		(state) => state.order
	);
	if (loading) {
		return (
			<div className={styles.order_details__loading}>
				<AppLoading />
			</div>
		);
	}
	if (error) {
		return (
			<div className={styles.order_details__loading}>
				<p className='text text_type_digits-medium' style={{ color: 'red' }}>
					`Во время оформления заказа произошла ошибка: ${error}.`
				</p>
			</div>
		);
	}
	return (
		<section className={`${styles.order_details} pt-4 pl-15 pr-15 mb-20`}>
			<h2
				className={`${styles.order_details__title} text text_type_digits-large mb-8`}>
				{createdOrder}
			</h2>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img className='mb-15' src={imgPath} alt='Done Icon' />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</section>
	);
};
