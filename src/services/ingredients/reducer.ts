import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { TIngredient } from '../../models/ingredient.model';
import { loadIngredients } from './actions';
import { TIngredientsResponse } from '../../models/api.model';

type TIngredientsState = {
	loading: boolean;
	error: string | null;
	ingredients: TIngredient[];
	ingredientsMap: Record<string, TIngredient>;
};

const initialState: TIngredientsState = {
	loading: false,
	error: null,
	ingredients: [],
	ingredientsMap: {},
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<TIngredientsState>) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.error as Error)?.message || 'unknown error';
			})
			.addCase(
				loadIngredients.fulfilled,
				(state, action: PayloadAction<TIngredientsResponse>) => {
					state.loading = false;
					state.ingredients = action.payload.data;
					action.payload.data.length &&
						action.payload.data.forEach((item: TIngredient) => {
							state.ingredientsMap[item._id] = item;
						});
				}
			);
	},
});
