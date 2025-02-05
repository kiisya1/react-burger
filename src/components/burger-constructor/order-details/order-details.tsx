import styles from './order-details.module.scss';
import imgPath from '../../../../src/images/graphics.png';
import { useAppSelector } from '../../../utils/hooks';

export const OrderDetails = () => {
	const orderNumber = useAppSelector((state) => state.order.order);
	return (
		<section className={`${styles.order_details} pt-4 pl-15 pr-15 mb-20`}>
			<h2
				className={`${styles.order_details__title} text text_type_digits-large mb-8`}>
				{orderNumber}
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
