import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked } from './reducer';
import { api } from '../../utils/api';
import { IUserWithPassword, TUser } from '../../models/user.model';

export const login = createAsyncThunk(
	'user/login',
	async (form: Omit<IUserWithPassword, 'name'>): Promise<TUser> =>
		api.login(form)
);

export const register = createAsyncThunk(
	'user/register',
	async (form: IUserWithPassword): Promise<TUser> => api.register(form)
);

export const logout = createAsyncThunk(
	'user/logout',
	async (): Promise<void> => api.logout()
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (data: IUserWithPassword): Promise<TUser> => api.patchUser(data)
);

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }): Promise<TUser> => {
		if (localStorage.getItem('accessToken')) {
			return api.getUser();
		} else {
			dispatch(setIsAuthChecked(true));
			return Promise.reject('no access token');
		}
	}
);
