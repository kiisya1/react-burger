import styles from './burger-ingredients.module.scss';
import { TIngredient, IngredientType } from '../../models/ingredient.model';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { useAppSelector } from '../../utils/hooks';

enum TabType {
	BUNS = 'buns',
	SAUCES = 'sauces',
	MAINS = 'mains',
}

export const BurgerIngredients = (): React.JSX.Element => {
	const tabsRef = useRef<HTMLDivElement>(null);
	const bunsRef = useRef<HTMLHeadingElement>(null);
	const ingredientsRef = useRef<HTMLHeadingElement>(null);
	const saucesRef = useRef<HTMLHeadingElement>(null);
	const ingredients: TIngredient[] = useAppSelector(
		(state) => state.ingredients.ingredients
	);
	const [currentTab, setCurrentTab] = useState<TabType>(TabType.BUNS);

	const buns: TIngredient[] = useMemo(() => {
		return ingredients?.filter(
			(item: TIngredient) => item.type === IngredientType.BUN
		);
	}, [ingredients]);
	const mains: TIngredient[] = useMemo(() => {
		return ingredients?.filter(
			(item: TIngredient) => item.type === IngredientType.MAIN
		);
	}, [ingredients]);

	const sauces: TIngredient[] = useMemo(() => {
		return ingredients?.filter(
			(item: TIngredient) => item.type === IngredientType.SAUCE
		);
	}, [ingredients]);

	const scrollOnClick = useCallback((tab: string): void => {
		switch (tab) {
			case TabType.BUNS: {
				bunsRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
			case TabType.MAINS: {
				ingredientsRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
			case TabType.SAUCES: {
				saucesRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				break;
			}
		}
	}, []);

	const handleScroll = (): void => {
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
				setCurrentTab(TabType.MAINS);
				break;
			}
			case diffBuns: {
				setCurrentTab(TabType.BUNS);
				break;
			}
			case diffSauce: {
				setCurrentTab(TabType.SAUCES);
				break;
			}
		}
	};

	return (
		<section className={styles.burger_ingredients}>
			<div ref={tabsRef} className={`${styles.burger_ingredients__tabs} mb-10`}>
				<Tab
					value={TabType.BUNS}
					active={currentTab === TabType.BUNS}
					onClick={scrollOnClick}>
					Булки
				</Tab>
				<Tab
					value={TabType.SAUCES}
					active={currentTab === TabType.SAUCES}
					onClick={scrollOnClick}>
					Соусы
				</Tab>
				<Tab
					value={TabType.MAINS}
					active={currentTab === TabType.MAINS}
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
		</section>
	);
};
