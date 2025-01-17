import { Ingredient } from './ingredient.model';

export interface BurgerIngredientsProps {
	ingredients: Ingredient[];
}

export interface IngredientsGroupProps extends BurgerIngredientsProps {
	title?: string;
}

export interface IngredientItemProps {
	ingredient: Ingredient;
	count?: number;
}
