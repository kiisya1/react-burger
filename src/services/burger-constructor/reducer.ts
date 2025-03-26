import {
	createSelector,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../models/constructor-ingredient.model';
import { TIngredient } from '../../models/ingredient.model';

type TBurgerConstructorState = {
	bun: TConstructorIngredient | null;
	ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const convertIngredientIntoConstructorIngredient = (
	ingredient: TIngredient,
	id: string
): { payload: TConstructorIngredient } => {
	return {
		payload: {
			text: ingredient.name,
			price: ingredient.price,
			thumbnail: ingredient.image,
			ingredientId: ingredient._id,
			id,
		},
	};
};

export const burgerConstructorSlice = createSlice({
	name: 'burger',
	initialState,
	selectors: {
		getCountedIngredients: createSelector(
			(state: TBurgerConstructorState) => state,
			(value: TBurgerConstructorState): Map<string, number> => {
				const countMap: Map<string, number> = new Map<string, number>();
				if (value.bun) {
					countMap.set(value.bun.ingredientId, 2);
				}
				if (value.ingredients.length) {
					value.ingredients.forEach((item: TConstructorIngredient) => {
						countMap.set(
							item.ingredientId,
							(countMap.get(item.ingredientId) ?? 0) + 1
						);
					});
				}
				return countMap;
			}
		),
		getOrderPrice: createSelector(
			(state: TBurgerConstructorState) => state,
			(value: TBurgerConstructorState): number => {
				let result = 0;
				if (value.bun) {
					result += value.bun.price * 2;
				}
				if (value.ingredients.length) {
					value.ingredients.forEach((item: TConstructorIngredient) => {
						result += item.price;
					});
				}
				return result;
			}
		),
		getOrderIngredients: createSelector(
			(state: TBurgerConstructorState) => state,
			(value: TBurgerConstructorState): string[] | undefined => {
				if (value.bun && value.ingredients.length) {
					return [
						value.bun.ingredientId,
						...value.ingredients.map((item) => item.ingredientId),
						value.bun.ingredientId,
					];
				}
				return;
			}
		),
	},
	reducers: {
		addIngredient: {
			reducer: (
				state: TBurgerConstructorState,
				action: PayloadAction<TConstructorIngredient>
			) => {
				state.ingredients.push(action.payload);
			},
			prepare: (ingredient: TIngredient) => {
				const id = nanoid();
				return convertIngredientIntoConstructorIngredient(ingredient, id);
			},
		},
		addBun: {
			reducer: (
				state: TBurgerConstructorState,
				action: PayloadAction<TConstructorIngredient>
			) => {
				state.bun = action.payload;
			},
			prepare: (ingredient: TIngredient) => {
				const id = nanoid();
				return convertIngredientIntoConstructorIngredient(ingredient, id);
			},
		},
		removeIngredient: (
			state: TBurgerConstructorState,
			action: PayloadAction<string>
		) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.id !== action.payload
			);
		},
		sortIngredient: (
			state: TBurgerConstructorState,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			state.ingredients.splice(
				action.payload.hoverIndex,
				0,
				state.ingredients.splice(action.payload.dragIndex, 1)[0]
			);
		},
		clearConstructor: () => initialState,
	},
});

export const {
	addIngredient,
	removeIngredient,
	addBun,
	sortIngredient,
	clearConstructor,
} = burgerConstructorSlice.actions;

export const { getCountedIngredients, getOrderPrice, getOrderIngredients } =
	burgerConstructorSlice.selectors;
