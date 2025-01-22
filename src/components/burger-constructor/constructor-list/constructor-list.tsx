import {
	BurgerConstructorProps,
	ConstructorItemProps,
	ConstructorItemType,
} from '../../../models/burger-constructor.model';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { Ingredient } from '../../../models/ingredient.model';
import styles from './constructor-list.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';

export const ConstructorList = (props: BurgerConstructorProps) => {
	const resultItems: ConstructorItemProps[] = useMemo(() => {
		return convertIngredientsToConstructorItems(props.ingredients);
	}, [props.ingredients]);
	const bun: Ingredient | undefined = useMemo(() => {
		return props.ingredients.find((item: Ingredient) => item.type === 'bun');
	}, [props.ingredients]);
	const start: ConstructorItemProps | undefined = useMemo(() => {
		return convertStartAndEndItem(bun, 'top');
	}, [bun]);

	const end: ConstructorItemProps | undefined = useMemo(() => {
		return convertStartAndEndItem(bun, 'bottom');
	}, [bun]);

	return (
		<div className='mb-10'>
			{start && <ConstructorItem {...start} />}
			<ul className={`${styles.constructor_list__list} custom-scroll`}>
				{resultItems.map((item: ConstructorItemProps) => {
					return (
						<li key={item.id} className={styles.constructor_list__item}>
							<ConstructorItem {...item} />
						</li>
					);
				})}
			</ul>
			{end && <ConstructorItem {...end} />}
		</div>
	);
};

function convertStartAndEndItem(
	bun: Ingredient | undefined,
	type: ConstructorItemType
): ConstructorItemProps | undefined {
	if (!bun) {
		return;
	}
	return {
		id: uuidv4(),
		text: bun.name,
		price: bun.price,
		thumbnail: bun.image,
		isLocked: true,
		type: type,
	};
}

function convertIngredientsToConstructorItems(
	ingredients: Ingredient[]
): ConstructorItemProps[] {
	return ingredients
		.filter((item: Ingredient) => item.type !== 'bun')
		.map((ingredient: Ingredient) => ({
			id: uuidv4(),
			text: ingredient.name,
			price: ingredient.price,
			thumbnail: ingredient.image,
		}));
}
