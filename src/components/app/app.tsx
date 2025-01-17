import { AppHeader } from '../app-header/app-header';
import styles from './app.module.scss';
import { AppMain } from '../app-main/app-main';
import React, { useState } from 'react';
import { mockData } from '../../utils/data';
import { Ingredient } from '../../models/ingredient.model';

export const App = () => {
	const [ingredients, setIngredients]: [
		Ingredient[],
		React.Dispatch<React.SetStateAction<Ingredient[]>>
	] = useState(mockData as Ingredient[]);
	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<AppMain ingredients={ingredients} />
		</div>
	);
};
