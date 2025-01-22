import { Ingredient } from './ingredient.model';

export interface BurgerIngredientsProps {
	ingredients: Ingredient[];
}

export interface IngredientsGroupProps extends BurgerIngredientsProps {
	title?: string;
	setIngredient: (value: Ingredient) => void;
}

export interface IngredientItemProps {
	ingredient: Ingredient;
	count?: number;
	setIngredient: (value: Ingredient) => void;
}

export interface IngredientDetailsProps {
	ingredient: Ingredient;
}
