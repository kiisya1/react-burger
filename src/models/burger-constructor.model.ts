import { Ingredient } from './ingredient.model';

export interface BurgerConstructorProps {
	ingredients: Ingredient[];
}

export interface ConstructorItemProps {
	text: string;
	thumbnail: string;
	price: number;
	type?: ConstructorItemType;
	isLocked?: boolean;
	extraClass?: string;
	handleClose?: () => void;
}

export type ConstructorItemType = 'top' | 'bottom';
