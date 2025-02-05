import {
	createSelector,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { ConstructorIngredient } from '../../models/burger-constructor.model';
import { Ingredient } from '../../models/ingredient.model';

interface BurgerConstructorState {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const convertIngredientIntoConstructorIngredient = (
	ingredient: Ingredient,
	id: string
) => {
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
			(state: BurgerConstructorState) => state,
			(value: BurgerConstructorState) => {
				const countMap: Map<string, number> = new Map();
				if (value.bun) {
					countMap.set(value.bun.ingredientId, 2);
				}
				if (value.ingredients.length) {
					value.ingredients.forEach((item: ConstructorIngredient) => {
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
			(state: BurgerConstructorState) => state,
			(value: BurgerConstructorState) => {
				let result = 0;
				if (value.bun) {
					result += value.bun.price * 2;
				}
				if (value.ingredients.length) {
					value.ingredients.forEach((item: ConstructorIngredient) => {
						result += item.price;
					});
				}
				return result;
			}
		),
		getOrderIngredients: createSelector(
			(state: BurgerConstructorState) => state,
			(value: BurgerConstructorState) => {
				if (value.bun && value.ingredients.length) {
					return [
						value.bun.ingredientId,
						...value.ingredients.map((item) => item.ingredientId),
						value.bun.ingredientId,
					];
				}
			}
		),
	},
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
				state.ingredients.push(action.payload);
			},
			prepare: (ingredient: Ingredient) => {
				const id = nanoid();
				return convertIngredientIntoConstructorIngredient(ingredient, id);
			},
		},
		addBun: {
			reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
				state.bun = action.payload;
			},
			prepare: (ingredient: Ingredient) => {
				const id = nanoid();
				return convertIngredientIntoConstructorIngredient(ingredient, id);
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.id !== action.payload
			);
		},
		sortIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			state.ingredients.splice(
				action.payload.hoverIndex,
				0,
				state.ingredients.splice(action.payload.dragIndex, 1)[0]
			);
		},
	},
});

export const { addIngredient, removeIngredient, addBun, sortIngredient } =
	burgerConstructorSlice.actions;

export const { getCountedIngredients, getOrderPrice, getOrderIngredients } =
	burgerConstructorSlice.selectors;
