import styles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingredient.model';
import React, { useCallback, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { BurgerIngredientsProps } from '../../models/burger-ingredients.model';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';

export const BurgerIngredients = (props: BurgerIngredientsProps) => {
	const [currentTab, setCurrentTab] = useState('buns');
	const [currentIngredient, setCurrentIngredient]: [
		Ingredient | null,
		React.Dispatch<React.SetStateAction<Ingredient | null>>
	] = useState<Ingredient | null>(null);
	const buns: Ingredient[] = useMemo(() => {
		return props.ingredients?.filter((item: Ingredient) => item.type === 'bun');
	}, [props.ingredients]);
	const mains: Ingredient[] = useMemo(() => {
		return props.ingredients?.filter(
			(item: Ingredient) => item.type === 'main'
		);
	}, [props.ingredients]);

	const sauces: Ingredient[] = useMemo(() => {
		return props.ingredients?.filter(
			(item: Ingredient) => item.type === 'sauce'
		);
	}, [props.ingredients]);

	const setIngredient = useCallback((ingredient: Ingredient) => {
		setCurrentIngredient(ingredient);
	}, []);

	const clearIngredient = useCallback(() => {
		setCurrentIngredient(null);
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<div className={`${styles.burger_ingredients__tabs} mb-10`}>
				<Tab
					value='buns'
					active={currentTab === 'buns'}
					onClick={setCurrentTab}>
					Булки
				</Tab>
				<Tab
					value='sauces'
					active={currentTab === 'sauces'}
					onClick={setCurrentTab}>
					Соусы
				</Tab>
				<Tab
					value='mains'
					active={currentTab === 'mains'}
					onClick={setCurrentTab}>
					Начинки
				</Tab>
			</div>
			<div className={`${styles.burger_ingredients__groups} custom-scroll`}>
				<IngredientsGroup
					setIngredient={setIngredient}
					ingredients={buns}
					title='Булки'
				/>
				<IngredientsGroup
					setIngredient={setIngredient}
					ingredients={sauces}
					title='Соусы'
				/>
				<IngredientsGroup
					setIngredient={setIngredient}
					ingredients={mains}
					title='Начинки'
				/>
			</div>
			{currentIngredient && (
				<Modal
					onClose={clearIngredient}
					title='Детали ингредиента'
					titleStyle='text_type_main-large'>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</section>
	);
};
