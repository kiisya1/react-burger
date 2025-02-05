import { Ingredient } from './ingredient.model';
import React from 'react';

export interface IngredientsGroupProps {
	ingredients: Ingredient[];
	title?: string;
	listRef: React.RefObject<HTMLHeadingElement>;
}

export interface IngredientItemProps {
	ingredient: Ingredient;
	count?: number;
}
