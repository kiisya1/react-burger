import {
	orderSlice,
	initialState,
	clearOrderNumber,
	errorText,
} from './reducer';
import { createOrder, getOrder } from './actions';

const createdOrder = {
	number: 10100,
};

const order = {
	_id: '67f4cab6e8e61d001cec101e',
	ingredients: [
		'643d69a5c3f7b9001cfa093d',
		'643d69a5c3f7b9001cfa093e',
		'643d69a5c3f7b9001cfa0941',
	],
	status: 'done',
	name: 'Флюоресцентный астероидный фалленианский био-марсианский метеоритный бургер',
	createdAt: '2025-04-08T07:05:26.222Z',
	number: 73777,
};

describe('Order store and actions', () => {
	it('should return the initial state', () => {
		expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should create an order', () => {
		const prevState = {
			...initialState,
			loading: true,
		};
		const action = {
			type: createOrder.fulfilled.type,
			payload: { order: createdOrder },
		};
		expect(orderSlice.reducer(prevState, action)).toEqual({
			...initialState,
			createdOrder: createdOrder.number,
		});
	});

	it('should change create order loading', () => {
		const action = { type: createOrder.pending.type };
		expect(orderSlice.reducer(initialState, action)).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should set create order error', () => {
		const prevState = {
			...initialState,
			loading: true,
		};
		const action = { type: createOrder.rejected.type };
		expect(orderSlice.reducer(prevState, action)).toEqual({
			...initialState,
			error: errorText,
		});
	});

	it('should get an order', () => {
		const prevState = {
			...initialState,
			orderLoading: true,
		};
		const action = {
			type: getOrder.fulfilled.type,
			payload: {
				orders: [order],
			},
		};
		expect(orderSlice.reducer(prevState, action)).toEqual({
			...initialState,
			order: order,
		});
	});

	it('should change get order loading', () => {
		const action = { type: getOrder.pending.type };
		expect(orderSlice.reducer(initialState, action)).toEqual({
			...initialState,
			orderLoading: true,
		});
	});

	it('should set get order error', () => {
		const prevState = {
			...initialState,
			orderLoading: true,
		};
		const action = { type: getOrder.rejected.type };
		expect(orderSlice.reducer(prevState, action)).toEqual({
			...initialState,
			orderError: errorText,
		});
	});

	it('should clear created order number', () => {
		const prevState = {
			...initialState,
			createdOrder: createdOrder.number,
		};
		const action = { type: clearOrderNumber.type };
		expect(orderSlice.reducer(prevState, action)).toEqual(initialState);
	});
});
