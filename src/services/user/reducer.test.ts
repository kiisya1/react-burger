import {
	userSlice,
	initialState,
	setIsAuthChecked,
	setUserIsUpdated,
} from './reducer';
import { login, register, logout, checkUserAuth, updateUser } from './actions';

const user = {
	email: '1@yandex.ru',
	name: 'Anna',
};

const updatedUser = {
	email: '2@yandex.ru',
	name: 'Ivan',
};

describe('User store and actions', () => {
	it('should return the initial state', () => {
		expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should login', () => {
		const action = {
			type: login.fulfilled.type,
			payload: user,
		};
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			user: user,
			isAuthChecked: true,
		});
	});

	it('should register', () => {
		const action = {
			type: register.fulfilled.type,
			payload: user,
		};
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			user: user,
			isAuthChecked: true,
		});
	});

	it('should logout', () => {
		const prevState = {
			...initialState,
			user: user,
			isAuthChecked: true,
		};
		const action = { type: logout.fulfilled.type };
		expect(userSlice.reducer(prevState, action)).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('should set updating state', () => {
		const prevState = {
			...initialState,
			user: user,
		};
		const action = { type: updateUser.pending.type };
		expect(userSlice.reducer(prevState, action)).toEqual({
			...initialState,
			user: user,
			isUpdating: true,
		});
	});

	it('should change updating state if rejected', () => {
		const prevState = {
			...initialState,
			user: user,
			isUpdating: true,
		};
		const action = { type: updateUser.rejected.type };
		expect(userSlice.reducer(prevState, action)).toEqual({
			...initialState,
			user: user,
		});
	});

	it('should update user', () => {
		const prevState = {
			...initialState,
			user: user,
			isUpdating: true,
		};
		const action = { type: updateUser.fulfilled.type, payload: updatedUser };
		expect(userSlice.reducer(prevState, action)).toEqual({
			...initialState,
			user: updatedUser,
			isUpdated: true,
		});
	});

	it('should reject while checking user', () => {
		const action = { type: checkUserAuth.rejected.type };
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('should check user', () => {
		const action = { type: checkUserAuth.fulfilled.type, payload: user };
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			user: user,
			isAuthChecked: true,
		});
	});

	it('should set auth checked', () => {
		const action = { type: setIsAuthChecked.type, payload: true };
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it('should set is updated', () => {
		const action = { type: setUserIsUpdated.type, payload: true };
		expect(userSlice.reducer(initialState, action)).toEqual({
			...initialState,
			isUpdated: true,
		});
	});
});
