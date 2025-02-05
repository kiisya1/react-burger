import styles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingredient.model';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { clearCurrentIngredient } from '../../services/current-ingredient/reducer';

export const BurgerIngredients = () => {
	const tabsRef = useRef<HTMLDivElement>(null);
	const bunsRef = useRef<HTMLHeadingElement>(null);
	const ingredientsRef = useRef<HTMLHeadingElement>(null);
	const saucesRef = useRef<HTMLHeadingElement>(null);
	const ingredients: Ingredient[] = useAppSelector(
		(state) => state.ingredients.ingredients
	);
	const currentIngredient: Ingredient | null = useAppSelector(
		(state) => state.currentIngredient.ingredient
	);
	const dispatch = useAppDispatch();
	const [currentTab, setCurrentTab] = useState('buns');

	const buns: Ingredient[] = useMemo(() => {
		return ingredients?.filter((item: Ingredient) => item.type === 'bun');
	}, [ingredients]);
	const mains: Ingredient[] = useMemo(() => {
		return ingredients?.filter((item: Ingredient) => item.type === 'main');
	}, [ingredients]);

	const sauces: Ingredient[] = useMemo(() => {
		return ingredients?.filter((item: Ingredient) => item.type === 'sauce');
	}, [ingredients]);

	const clearIngredient = useCallback(() => {
		dispatch(clearCurrentIngredient());
	}, [dispatch]);

	const scrollOnClick = useCallback((tab: string) => {
		switch (tab) {
			case 'buns': {
				bunsRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
			case 'mains': {
				ingredientsRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
			case 'sauces': {
				saucesRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
		}
	}, []);

	const handleScroll = () => {
		const tabs: DOMRect | undefined = tabsRef.current?.getBoundingClientRect();

		const ing: DOMRect | undefined =
			ingredientsRef.current?.getBoundingClientRect();

		const buns: DOMRect | undefined = bunsRef.current?.getBoundingClientRect();

		const sauces: DOMRect | undefined =
			saucesRef.current?.getBoundingClientRect();

		const diffIng = ing && tabs && Math.abs(ing?.top - tabs?.bottom);
		const diffBuns = buns && tabs && Math.abs(buns?.top - tabs?.bottom);
		const diffSauce = sauces && tabs && Math.abs(sauces?.top - tabs?.bottom);
		const min =
			diffIng &&
			diffBuns &&
			diffSauce &&
			Math.min(diffIng, diffBuns, diffSauce);

		switch (min) {
			case diffIng: {
				setCurrentTab('mains');
				break;
			}
			case diffBuns: {
				setCurrentTab('buns');
				break;
			}
			case diffSauce: {
				setCurrentTab('sauces');
				break;
			}
		}
	};

	return (
		<section className={styles.burger_ingredients}>
			<div ref={tabsRef} className={`${styles.burger_ingredients__tabs} mb-10`}>
				<Tab
					value='buns'
					active={currentTab === 'buns'}
					onClick={scrollOnClick}>
					Булки
				</Tab>
				<Tab
					value='sauces'
					active={currentTab === 'sauces'}
					onClick={scrollOnClick}>
					Соусы
				</Tab>
				<Tab
					value='mains'
					active={currentTab === 'mains'}
					onClick={scrollOnClick}>
					Начинки
				</Tab>
			</div>
			<div
				onScroll={handleScroll}
				className={`${styles.burger_ingredients__groups} custom-scroll`}>
				<IngredientsGroup listRef={bunsRef} ingredients={buns} title='Булки' />
				<IngredientsGroup
					listRef={saucesRef}
					ingredients={sauces}
					title='Соусы'
				/>
				<IngredientsGroup
					listRef={ingredientsRef}
					ingredients={mains}
					title='Начинки'
				/>
			</div>
			{currentIngredient && (
				<Modal
					onClose={clearIngredient}
					title='Детали ингредиента'
					titleStyle='text_type_main-large'>
					<IngredientDetails />
				</Modal>
			)}
		</section>
	);
};
