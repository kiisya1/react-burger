import { TOrder } from '../../models/order.model';
import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { TOrderListResponse, WebsocketStatus } from '../../models/api.model';

type TOrderListState = {
	status: WebsocketStatus;
	orders: TOrder[];
	total: number;
	totalToday: number;
	error: string | null;
};

export const initialState: TOrderListState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const orderListSlice = createSlice({
	name: 'orderList',
	initialState,
	reducers: {},
	selectors: {
		getStatus: (state: TOrderListState) => state.status,
		getOrderList: (state: TOrderListState) => state.orders,
		getError: (state: TOrderListState) => state.error,
		getTotal: (state: TOrderListState) => state.total,
		getTotalToday: (state: TOrderListState) => state.totalToday,
	},
	extraReducers: (builder: ActionReducerMapBuilder<TOrderListState>) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onError, (state, action: PayloadAction<string>) => {
				state.error = action.payload;
			})
			.addCase(
				onMessage,
				(state, action: PayloadAction<TOrderListResponse>) => {
					state.orders = action.payload.orders;
					state.total = action.payload.total;
					state.totalToday = action.payload.totalToday;
					state.error = null;
				}
			);
	},
});

export const { getStatus, getOrderList, getError, getTotal, getTotalToday } =
	orderListSlice.selectors;
