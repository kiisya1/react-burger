import { ConnectDropTarget } from 'react-dnd';

export interface ConstructorIngredient {
	id: string;
	text: string;
	price: number;
	thumbnail: string;
	ingredientId: string;
	type?: ConstructorItemType;
	isLocked?: boolean;
	extraClass?: string;
}

export type ConstructorItemType = 'top' | 'bottom';

export interface ConstructorItemProps extends ConstructorIngredient {
	dropRef?: ConnectDropTarget;
	index?: number;
}
