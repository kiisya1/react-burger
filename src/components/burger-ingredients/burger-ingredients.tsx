import styles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingredient.model';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { BurgerIngredientsProps } from '../../models/burger-ingredients.model';

export const BurgerIngredients = (props: BurgerIngredientsProps) => {
	const [current, setCurrent] = React.useState('buns');
	const buns: Ingredient[] = props.ingredients?.filter(
		(item: Ingredient) => item.type === 'bun'
	);
	const mains: Ingredient[] = props.ingredients?.filter(
		(item: Ingredient) => item.type === 'main'
	);
	const sauces: Ingredient[] = props.ingredients?.filter(
		(item: Ingredient) => item.type === 'sauce'
	);
	return (
		<section className={styles.burger_ingredients}>
			<div className={`${styles.burger_ingredients__tabs} mb-10`}>
				<Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='mains' active={current === 'mains'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={`${styles.burger_ingredients__groups} custom-scroll`}>
				<IngredientsGroup ingredients={buns} title='Булки' />
				<IngredientsGroup ingredients={sauces} title='Соусы' />
				<IngredientsGroup ingredients={mains} title='Начинки' />
			</div>
		</section>
	);
};
