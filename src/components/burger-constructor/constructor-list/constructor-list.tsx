import {
	BurgerConstructorProps,
	ConstructorItemProps,
	ConstructorItemType,
} from '../../../models/burger-constructor.model';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { Ingredient } from '../../../models/ingredient.model';
import styles from './constructor-list.module.scss';

export const ConstructorList = (props: BurgerConstructorProps) => {
	const resultItems: ConstructorItemProps[] =
		convertIngredientsToConstructorItems(props.ingredients);
	const bun: Ingredient | undefined = props.ingredients.find(
		(item: Ingredient) => item.type === 'bun'
	);
	const start: ConstructorItemProps | undefined = convertStartAndEndItem(
		bun,
		'top'
	);
	const end: ConstructorItemProps | undefined = convertStartAndEndItem(
		bun,
		'bottom'
	);
	return (
		<div className='mb-10'>
			{start && <ConstructorItem {...start} />}
			<ul className={`${styles.constructor_list__list} custom-scroll`}>
				{resultItems.map((item: ConstructorItemProps, index: number) => {
					return (
						<li key={index} className={styles.constructor_list__item}>
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
			text: ingredient.name,
			price: ingredient.price,
			thumbnail: ingredient.image,
		}));
}
