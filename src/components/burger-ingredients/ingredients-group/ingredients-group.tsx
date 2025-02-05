import { Ingredient } from '../../../models/ingredient.model';
import styles from './ingredients-group.module.scss';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { IngredientsGroupProps } from '../../../models/burger-ingredients.model';
import { useAppSelector } from '../../../utils/hooks';
import { getCountedIngredients } from '../../../services/burger-constructor/reducer';

export const IngredientsGroup = (props: IngredientsGroupProps) => {
	const counts: Map<string, number> = useAppSelector(getCountedIngredients);
	return (
		<>
			<h2 ref={props.listRef} className='text text_type_main-medium mb-6'>
				{props.title}
			</h2>
			<ul className={`${styles.ingredients_group__list}`}>
				{props.ingredients.map((ingredient: Ingredient) => {
					return (
						<IngredientItem
							key={ingredient._id}
							ingredient={ingredient}
							count={counts.get(ingredient._id)}
						/>
					);
				})}
			</ul>
		</>
	);
};
