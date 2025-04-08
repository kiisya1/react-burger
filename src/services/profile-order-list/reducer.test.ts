import { profileOrderListSlice, initialState } from './reducer';
import {
	onProfileConnecting,
	onProfileOpen,
	onProfileClose,
	onProfileError,
	onProfileMessage,
} from './actions';
import { WebsocketStatus } from '../../models/api.model';

const data = {
	orders: [
		{
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
		},
	],
};

const error = 'Something went wrong';

describe('Profile orders store and actions', () => {
	it('should return the initial state', () => {
		expect(profileOrderListSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should set connecting status', () => {
		const action = { type: onProfileConnecting.type };
		expect(profileOrderListSlice.reducer(initialState, action)).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('should set online status', () => {
		const action = { type: onProfileOpen.type };
		expect(profileOrderListSlice.reducer(initialState, action)).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('should set offline status', () => {
		const action = { type: onProfileClose.type };
		expect(profileOrderListSlice.reducer(initialState, action)).toEqual({
			...initialState,
			status: WebsocketStatus.OFFLINE,
		});
	});

	it('should set error', () => {
		const action = {
			type: onProfileError.type,
			payload: error,
		};
		expect(profileOrderListSlice.reducer(initialState, action)).toEqual({
			...initialState,
			error: error,
		});
	});

	it('should set data', () => {
		const action = { type: onProfileMessage.type, payload: data };
		expect(profileOrderListSlice.reducer(initialState, action)).toEqual({
			...initialState,
			...data,
		});
	});
});
