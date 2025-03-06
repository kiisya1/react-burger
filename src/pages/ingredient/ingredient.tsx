import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredient.module.scss';
import React from 'react';

export const Ingredient = (): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<h1 className={`${styles.heading} text text_type_main-large`}>
				Детали ингредиента
			</h1>
			<IngredientDetails />
		</div>
	);
};
