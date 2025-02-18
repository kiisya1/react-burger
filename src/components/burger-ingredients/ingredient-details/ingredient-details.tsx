import styles from './ingredient-details.module.scss';
import { Ingredient } from '../../../models/ingredient.model';
import { useAppSelector } from '../../../utils/hooks';
import { useParams } from 'react-router-dom';

export const IngredientDetails = () => {
	const { id } = useParams<'id'>();
	const ingredient: Ingredient | null =
		useAppSelector((state) =>
			state.ingredients.ingredients.find((item: Ingredient) => item._id === id)
		) ?? null;

	if (!ingredient)
		return (
			<p className='text text_type_main-medium text_color_inactive'>
				Ингредиент не найден
			</p>
		);

	return (
		<section className={`${styles.ingredient_details} mb-5 pl-15 pr-15`}>
			<img
				className='mb-4'
				src={ingredient?.image_large}
				alt={ingredient?.name}
			/>
			<p className='text text_type_main-medium mb-8'>{ingredient?.name}</p>
			<ul className={styles.ingredient_details__info}>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Калории,ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient?.calories}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient?.proteins}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient?.fat}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient?.carbohydrates}
					</p>
				</li>
			</ul>
		</section>
	);
};
