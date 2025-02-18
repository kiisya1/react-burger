import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { clearConstructor } from '../burger-constructor/reducer';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredients: string[], { dispatch }) => {
		return api.addOrder(ingredients).then((res) => {
			dispatch(clearConstructor());
			return res;
		});
	}
);
