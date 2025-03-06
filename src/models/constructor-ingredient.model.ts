export type TConstructorIngredient = {
	id: string;
	text: string;
	price: number;
	thumbnail: string;
	ingredientId: string;
	type?: TConstructorItemType;
	isLocked?: boolean;
	extraClass?: string;
};

export type TConstructorItemType = 'top' | 'bottom';
