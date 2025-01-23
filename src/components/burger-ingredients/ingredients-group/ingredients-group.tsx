import { Ingredient } from '../../../models/ingredient.model';
import styles from './ingredients-group.module.scss';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { IngredientsGroupProps } from '../../../models/burger-ingredients.model';

export const IngredientsGroup = (props: IngredientsGroupProps) => {
	return (
		<>
			<h2 className='text text_type_main-medium mb-6'>{props.title}</h2>
			<ul className={`${styles.ingredients_group__list}`}>
				{props.ingredients.map((ingredient: Ingredient) => {
					return (
						<IngredientItem
							setIngredient={props.setIngredient}
							key={ingredient._id}
							ingredient={ingredient}
							count={1}
						/>
					);
				})}
			</ul>
		</>
	);
};
