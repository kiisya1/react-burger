import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/reducer';
import { orderSlice } from './order/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { userSlice } from './user/reducer';
import { orderListSlice } from './order-list/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect,
	disconnect,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from './order-list/actions';
import { profileOrderListSlice } from './profile-order-list/reducer';
import {
	onProfileClose,
	onProfileConnecting,
	onProfileError,
	onProfileMessage,
	onProfileOpen,
	profileConnect,
	profileDisconnect,
} from './profile-order-list/actions';
import { TOrderListResponse } from '../models/api.model';

export const reducer = combineSlices(
	burgerConstructorSlice,
	orderSlice,
	ingredientsSlice,
	userSlice,
	orderListSlice,
	profileOrderListSlice
);

const orderListMiddleware = socketMiddleware<TOrderListResponse, string>({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onError,
	onMessage,
	onClose,
});

const profileOrderListMiddleware = socketMiddleware<TOrderListResponse, string>(
	{
		connect: profileConnect,
		disconnect: profileDisconnect,
		onConnecting: onProfileConnecting,
		onOpen: onProfileOpen,
		onError: onProfileError,
		onMessage: onProfileMessage,
		onClose: onProfileClose,
	},
	true
);

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			orderListMiddleware,
			profileOrderListMiddleware
		);
	},
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
