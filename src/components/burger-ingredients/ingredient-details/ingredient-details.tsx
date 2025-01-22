import { IngredientDetailsProps } from '../../../models/burger-ingredients.model';
import styles from './ingredient-details.module.scss';

export const IngredientDetails = (props: IngredientDetailsProps) => {
	return (
		<section className={`${styles.ingredient_details} mb-5 pl-15 pr-15`}>
			<img
				className='mb-4'
				src={props.ingredient.image_large}
				alt={props.ingredient.name}
			/>
			<p className='text text_type_main-medium mb-8'>{props.ingredient.name}</p>
			<ul className={styles.ingredient_details__info}>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Калории,ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.calories}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.proteins}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.fat}
					</p>
				</li>
				<li className={styles.ingredient_details__info_item}>
					<p className='text_type_main-default text_color_inactive mb-2'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{props.ingredient.carbohydrates}
					</p>
				</li>
			</ul>
		</section>
	);
};
