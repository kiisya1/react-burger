import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrder } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredients: string[]) => {
		return addOrder(ingredients);
	}
);
