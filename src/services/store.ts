import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burger-constructor/reducer';
import { orderSlice } from './order/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { currentIngredientSlice } from './current-ingredient/reducer';

export const reducer = combineSlices(
	burgerConstructorSlice,
	orderSlice,
	ingredientsSlice,
	currentIngredientSlice
);

export const store = configureStore({
	reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
