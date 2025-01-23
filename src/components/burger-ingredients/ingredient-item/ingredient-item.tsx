import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.scss';
import { IngredientItemProps } from '../../../models/burger-ingredients.model';

export const IngredientItem = (props: IngredientItemProps) => {
	return (
		<li
			onClick={() => props.setIngredient(props.ingredient)}
			className={styles.ingredient_item}>
			{props.count && (
				<Counter count={props.count} size='default' extraClass='m-1' />
			)}
			<img
				className={`${styles.ingredient_item__img} mb-2`}
				alt={props.ingredient.name}
				src={props.ingredient.image}
			/>
			<p
				className={`${styles.ingredient_item__price} text text_type_digits-default mb-2`}>
				{props.ingredient.price} <CurrencyIcon type='primary' />
			</p>
			<p
				className={`${styles.ingredient_item__name} text text_type_main-default`}>
				{props.ingredient.name}
			</p>
		</li>
	);
};
