import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../models/ingredient.model';
import { loadIngredients } from './actions';
import { TIngredientsResponse } from '../../models/api.model';

interface IngredientsState {
	loading: boolean;
	error: string | null;
	ingredients: TIngredient[];
}

const initialState: IngredientsState = {
	loading: false,
	error: null,
	ingredients: [],
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'unknown error';
			})
			.addCase(
				loadIngredients.fulfilled,
				(state, action: PayloadAction<TIngredientsResponse>) => {
					state.loading = false;
					state.ingredients = action.payload.data;
				}
			);
	},
});
