import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TIngredientsResponse } from '../../models/api.model';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async (): Promise<TIngredientsResponse> => {
		return api.getIngredients();
	}
);
