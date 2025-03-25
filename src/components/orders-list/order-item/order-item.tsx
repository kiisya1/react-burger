import React, { useMemo } from 'react';
import styles from './order-item.module.scss';
import { Link, useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../models/ingredient.model';
import { useAppSelector } from '../../../utils/hooks';
import { TOrder } from '../../../models/order.model';
import { statusMap } from '../../../constants/order-status.constants';

type TOrderItem = {
	order: TOrder;
	hideStatus?: boolean;
};

export const OrderItem = ({
	hideStatus,
	order,
}: TOrderItem): React.JSX.Element => {
	const location = useLocation();
	const ingredientsMap: Record<string, TIngredient> = useAppSelector(
		(state) => state.ingredients.ingredientsMap
	);
	const ingredients: string[] = order.ingredients.slice(
		0,
		order.ingredients.length > 6 ? 6 : order.ingredients.length
	);
	const leftCount =
		order.ingredients.length > 6 ? order.ingredients.length - 6 : null;

	const price: number = useMemo(() => {
		return order.ingredients.reduce(
			(sum: number, current: string) => sum + ingredientsMap[current].price,
			0
		);
	}, [ingredientsMap, order.ingredients]);

	return (
		<>
			<div className={`${styles.container} mb-6`}>
				<Link
					to={`${order.number}`}
					state={{ backgroundLocation: location }}
					className={`${styles.link} text text_type_digits-default`}>
					{`#${order.number}`}
				</Link>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</p>
			</div>
			<h2 className='text text_type_main-medium mb-2'>{order.name}</h2>
			{!hideStatus && (
				<p
					className={`${
						order.status === 'done' ? styles.status_active : ''
					} text text_type_main-default`}>
					{statusMap[order.status]}
				</p>
			)}
			<div className={`${styles.container} mt-6`}>
				<ul className={styles.ingredients}>
					{ingredients.map((ingredient: string, index: number) => {
						return (
							<li key={index} className={styles.ingredients_item}>
								<div
									className={styles.image_container}
									style={{ zIndex: ingredients.length - index }}>
									<img
										className={styles.image}
										src={ingredientsMap[ingredient].image_mobile}
										alt={ingredientsMap[ingredient].name}
									/>
									{leftCount && index === ingredients.length - 1 && (
										<span className={styles.count}>{`+${leftCount}`}</span>
									)}
								</div>
							</li>
						);
					})}
				</ul>
				<p className={`${styles.price} text text_type_digits-default`}>
					{price}
					<CurrencyIcon type='primary' />
				</p>
			</div>
		</>
	);
};
