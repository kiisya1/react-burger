import { BurgerConstructorProps } from '../../models/burger-constructor.model';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from './constructor-list/constructor-list';
import styles from './burger-constructor.module.scss';

export const BurgerConstructor = (props: BurgerConstructorProps) => {
	return (
		<section className={`${styles.burger_constructor} pl-4`}>
			<ConstructorList ingredients={props.ingredients} />
			<section className={`${styles.burger_constructor__total}`}>
				<p className='text text_type_digits-medium'>
					{'610'} <CurrencyIcon type='primary' />
				</p>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</section>
		</section>
	);
};
