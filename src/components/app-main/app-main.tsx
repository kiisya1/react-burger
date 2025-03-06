import styles from './app-main.module.scss';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';

export const AppMain = (): React.JSX.Element => {
	return (
		<main className={`${styles.main} pt-10 pb-10`}>
			<h1
				className={`${styles.title_container} text text_type_main-large mb-5 pl-5 pr-5`}>
				Соберите бургер
			</h1>
			<div className={`${styles.container} pl-5 pr-5`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</div>
		</main>
	);
};
