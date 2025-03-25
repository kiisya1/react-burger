import { TOrderListResponse, WebsocketStatus } from '../../models/api.model';
import { TOrder } from '../../models/order.model';
import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	onProfileClose,
	onProfileConnecting,
	onProfileError,
	onProfileMessage,
	onProfileOpen,
} from './actions';

type TProfileOrderListState = {
	status: WebsocketStatus;
	orders: TOrder[];
	error: string | null;
};

const initialState: TProfileOrderListState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	error: null,
};

export const profileOrderListSlice = createSlice({
	name: 'profileOrderList',
	initialState,
	reducers: {},
	selectors: {
		getProfileStatus: (state: TProfileOrderListState) => state.status,
		getProfileOrderList: (state: TProfileOrderListState) => state.orders,
		getProfileError: (state: TProfileOrderListState) => state.error,
	},
	extraReducers: (builder: ActionReducerMapBuilder<TProfileOrderListState>) => {
		builder
			.addCase(onProfileConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onProfileOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onProfileClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onProfileError, (state, action: PayloadAction<string>) => {
				state.error = action.payload;
			})
			.addCase(
				onProfileMessage,
				(state, action: PayloadAction<TOrderListResponse>) => {
					state.orders = action.payload.orders;
					state.error = null;
				}
			);
	},
});

export const { getProfileStatus, getProfileOrderList, getProfileError } =
	profileOrderListSlice.selectors;
