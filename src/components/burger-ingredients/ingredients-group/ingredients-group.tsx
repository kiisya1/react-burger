import { TIngredient } from '../../../models/ingredient.model';
import styles from './ingredients-group.module.scss';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { useAppSelector } from '../../../utils/hooks';
import { getCountedIngredients } from '../../../services/burger-constructor/reducer';
import React from 'react';

type TIngredientsGroup = {
	ingredients: TIngredient[];
	title: string;
	listRef: React.RefObject<HTMLHeadingElement>;
};

export const IngredientsGroup = (
	props: TIngredientsGroup
): React.JSX.Element => {
	const counts: Map<string, number> = useAppSelector(getCountedIngredients);
	return (
		<>
			<h2 ref={props.listRef} className='text text_type_main-medium mb-6'>
				{props.title}
			</h2>
			<ul className={`${styles.ingredients_group__list}`}>
				{props.ingredients.map((ingredient: TIngredient) => {
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
