import { ConstructorIngredient } from '../../../models/burger-constructor.model';
import { ConstructorItem } from '../constructor-item/constructor-item';
import styles from './constructor-list.module.scss';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { useDrop } from 'react-dnd';
import {
	addBun,
	addIngredient,
} from '../../../services/burger-constructor/reducer';
import { Ingredient } from '../../../models/ingredient.model';

export const ConstructorList = () => {
	const { bun, ingredients } = useAppSelector((state) => state.burger);
	const dispatch = useAppDispatch();
	const [{ isHoverIngredient }, ingredientTarget] = useDrop({
		accept: 'ingredient',
		drop(item: Ingredient) {
			dispatch(addIngredient(item));
		},
		collect: (monitor) => ({
			isHoverIngredient: monitor.isOver(),
		}),
	});

	const [{ isHoverBunTop }, bunTargetTop] = useDrop({
		accept: 'bun',
		drop(item: Ingredient) {
			dispatch(addBun(item));
		},
		collect: (monitor) => ({
			isHoverBunTop: monitor.isOver(),
		}),
	});

	const [{ isHoverBunBottom }, bunTargetBottom] = useDrop({
		accept: 'bun',
		drop(item: Ingredient) {
			dispatch(addBun(item));
		},
		collect: (monitor) => ({
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
					className={`${styles.constructor_list__bun} ${styles.top} ${styles.constructor_list__item} text text_type_main-default`}>
					Выберите булки
				</div>
			)}
			<ul
				ref={ingredientTarget}
				className={`${styles.constructor_list__list} custom-scroll`}>
				{ingredients.length ? (
					ingredients.map((item: ConstructorIngredient, index: number) => {
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
