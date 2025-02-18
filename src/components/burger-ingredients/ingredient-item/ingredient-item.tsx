import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.scss';
import { IngredientItemProps } from '../../../models/burger-ingredients.model';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

export const IngredientItem = (props: IngredientItemProps) => {
	const location = useLocation();
	const [, dragRef] = useDrag({
		type: props.ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: props.ingredient,
	});
	return (
		<li ref={dragRef} className={styles.ingredient_item}>
			<Link
				className={styles.ingredient_item__link}
				to={`/ingredients/${props.ingredient._id}`}
				state={{ backgroundLocation: location }}>
				{props.count && (
					<Counter count={props.count} size='default' extraClass='m-1' />
				)}
				<img
					className={`${styles.ingredient_item__image} mb-2`}
					alt={props.ingredient.name}
					src={props.ingredient.image}
				/>
				<p
					className={`${styles.ingredient_item__price} text text_type_digits-default mb-2`}>
					{props.ingredient.price} <CurrencyIcon type='primary' />
				</p>
				<p className={'text text_type_main-default'}>{props.ingredient.name}</p>
			</Link>
		</li>
	);
};
