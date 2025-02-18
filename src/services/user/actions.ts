import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked } from './reducer';
import { api } from '../../utils/api';
import { UserWithPassword } from '../../models/user.model';

export const login = createAsyncThunk('user/login', async (form: any) => {
	return api.login(form);
});

export const register = createAsyncThunk('user/register', async (form: any) => {
	return api.register(form);
});

export const logout = createAsyncThunk('user/logout', async () => {
	return api.logout();
});

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (data: UserWithPassword) => {
		return api.patchUser(data);
	}
);

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			return api.getUser();
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
