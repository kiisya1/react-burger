import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { clearConstructor } from '../burger-constructor/reducer';
import { TOrderResponse } from '../../models/api.model';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredients: string[], { dispatch }): Promise<TOrderResponse> => {
		return api.addOrder(ingredients).then((res) => {
			dispatch(clearConstructor());
			return res;
		});
	}
);
