import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../models/ingredient.model';

interface CurrentIngredientState {
	ingredient: Ingredient | null;
}

const initialState: CurrentIngredientState = {
	ingredient: null,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
			state.ingredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.ingredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	currentIngredientSlice.actions;
