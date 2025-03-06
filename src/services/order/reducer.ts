import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from './actions';
import { TOrderResponse } from '../../models/api.model';

interface OrderState {
	order: number | null;
	loading: boolean;
	error: string | null;
}

const initialState: OrderState = {
	order: null,
	loading: false,
	error: null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrderNumber: (state) => {
			state.order = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'unknown error';
			})
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<TOrderResponse>) => {
					state.loading = false;
					state.order = action.payload.order.number;
				}
			);
	},
});

export const { clearOrderNumber } = orderSlice.actions;
