import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { createOrder, getOrder } from './actions';
import { TOrderInfoResponse, TOrderResponse } from '../../models/api.model';
import { TOrder } from '../../models/order.model';

type TOrderState = {
	createdOrder: number | null;
	loading: boolean;
	error: string | null;
	order: TOrder | null;
	orderLoading: boolean;
	orderError: string | null;
};

export const initialState: TOrderState = {
	createdOrder: null,
	loading: false,
	error: null,
	order: null,
	orderError: null,
	orderLoading: false,
};

export const errorText = 'unknown error';

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrderNumber: (state: TOrderState) => {
			state.createdOrder = null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<TOrderState>) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.error as Error)?.message || errorText;
			})
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<TOrderResponse>) => {
					state.loading = false;
					state.createdOrder = action.payload.order.number;
				}
			)
			.addCase(getOrder.pending, (state) => {
				state.orderLoading = true;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.orderLoading = false;
				state.orderError = (action.error as Error)?.message || errorText;
			})
			.addCase(
				getOrder.fulfilled,
				(state, action: PayloadAction<TOrderInfoResponse>) => {
					state.orderLoading = false;
					state.order = action.payload.orders[0];
				}
			);
	},
});

export const { clearOrderNumber } = orderSlice.actions;
