import { createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsUrl } from '../../constants/api.constants';
import { getIngredients } from '../../utils/burger-api';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async () => {
		return getIngredients(ingredientsUrl);
	}
);
