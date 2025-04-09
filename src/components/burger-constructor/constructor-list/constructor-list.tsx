import { TConstructorIngredient } from '../../../models/constructor-ingredient.model';
import { ConstructorItem } from '../constructor-item/constructor-item';
import styles from './constructor-list.module.scss';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import {
	addBun,
	addIngredient,
} from '../../../services/burger-constructor/reducer';
import { TIngredient } from '../../../models/ingredient.model';
import React from 'react';

type TDropCollectedPropsIngredient = {
	isHoverIngredient: boolean;
};

type TDropCollectedPropsBunTop = {
	isHoverBunTop: boolean;
};

type TDropCollectedPropsBunBottom = {
	isHoverBunBottom: boolean;
};

export const ConstructorList = (): React.JSX.Element => {
	const { bun, ingredients } = useAppSelector((state) => state.burger);
	const dispatch = useAppDispatch();
	const [{ isHoverIngredient }, ingredientTarget] = useDrop<
		TIngredient,
		unknown,
		TDropCollectedPropsIngredient
	>({
		accept: 'ingredient',
		drop(item: TIngredient) {
			dispatch(addIngredient(item));
		},
		collect: (monitor: DropTargetMonitor<TIngredient, unknown>) => ({
			isHoverIngredient: monitor.isOver(),
		}),
	});

	const [{ isHoverBunTop }, bunTargetTop] = useDrop<
		TIngredient,
		unknown,
		TDropCollectedPropsBunTop
	>({
		accept: 'bun',
		drop(item: TIngredient) {
			dispatch(addBun(item));
		},
		collect: (monitor: DropTargetMonitor<TIngredient, unknown>) => ({
			isHoverBunTop: monitor.isOver(),
		}),
	});

	const [{ isHoverBunBottom }, bunTargetBottom] = useDrop<
		TIngredient,
		unknown,
		TDropCollectedPropsBunBottom
	>({
		accept: 'bun',
		drop(item: TIngredient) {
			dispatch(addBun(item));
		},
		collect: (monitor: DropTargetMonitor<TIngredient, unknown>) => ({
			isHoverBunBottom: monitor.isOver(),
		}),
	});

	const borderColor =
		isHoverBunBottom || isHoverBunTop ? 'rgba(76, 76, 255, 0.8)' : '#2f2f37';

	const ingredientBorderColor = isHoverIngredient
		? 'rgba(76, 76, 255, 0.8)'
		: '#2f2f37';

	return (
		<div className='mb-10'>
			{bun ? (
				<ConstructorItem
					dropRef={bunTargetTop}
					isLocked={true}
					type='top'
					{...bun}
					text={`${bun.text} (верх)`}
				/>
			) : (
				<div
					ref={bunTargetTop}
					style={{ borderColor }}
					data-testid='bun-container'
					className={`${styles.constructor_list__bun} ${styles.top} ${styles.constructor_list__item} text text_type_main-default`}>
					Выберите булки
				</div>
			)}
			<ul
				ref={ingredientTarget}
				data-testid='ingredients-container'
				className={`${styles.constructor_list__list} custom-scroll`}>
				{ingredients.length ? (
					ingredients.map((item: TConstructorIngredient, index: number) => {
						return (
							<li key={item.id} className={styles.constructor_list__item}>
								<ConstructorItem index={index} {...item} />
							</li>
						);
					})
				) : (
					<li
						style={{ borderColor: ingredientBorderColor }}
						className={`${styles.constructor_list__bun} ${styles.constructor_list__item} text text_type_main-default`}>
						Выберите начинку
					</li>
				)}
			</ul>
			{bun ? (
				<ConstructorItem
					dropRef={bunTargetBottom}
					isLocked={true}
					type='bottom'
					{...bun}
					text={`${bun.text} (низ)`}
				/>
			) : (
				<div
					ref={bunTargetBottom}
					style={{ borderColor }}
					className={`${styles.constructor_list__bun} ${styles.bottom} ${styles.constructor_list__item} text text_type_main-default`}>
					Выберите булки
				</div>
			)}
		</div>
	);
};
