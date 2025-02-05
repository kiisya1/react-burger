import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.scss';
import { IngredientItemProps } from '../../../models/burger-ingredients.model';
import { setCurrentIngredient } from '../../../services/current-ingredient/reducer';
import { useAppDispatch } from '../../../utils/hooks';
import { useDrag } from 'react-dnd';

export const IngredientItem = (props: IngredientItemProps) => {
	const dispatch = useAppDispatch();
	const setIngredient = () => {
		dispatch(setCurrentIngredient(props.ingredient));
	};
	const [, dragRef] = useDrag({
		type: props.ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: props.ingredient,
	});
	return (
		<li
			ref={dragRef}
			onClick={setIngredient}
			className={styles.ingredient_item}>
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
		</li>
	);
};
