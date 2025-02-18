import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/reducer';
import { orderSlice } from './order/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { userSlice } from './user/reducer';

export const reducer = combineSlices(
	burgerConstructorSlice,
	orderSlice,
	ingredientsSlice,
	userSlice
);

export const store = configureStore({
	reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
