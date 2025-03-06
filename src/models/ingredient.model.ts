export enum IngredientType {
	BUN = 'bun',
	MAIN = 'main',
	SAUCE = 'sauce',
}

export type TIngredient = {
	_id: string;
	name: string;
	type?: IngredientType;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price: number;
	image: string;
	image_mobile?: string;
	image_large?: string;
};
