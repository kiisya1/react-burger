import {
	baseUrl,
	ingredientsUrl,
	loginUrl,
	logoutUrl,
	orderUrl,
	passwordResetUrl,
	registerUrl,
	resetUrl,
	tokenUrl,
	userUrl,
} from '../constants/api.constants';
import { IUserWithPassword, TUser } from '../models/user.model';
import {
	TForgotPasswordBody,
	TTokenBody,
	TResetPasswordBody,
	TResponse,
	TUserResponse,
	TIngredientsResponse,
	TOrderResponse,
} from '../models/api.model';

const checkResponse = async <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
	return fetch(`${baseUrl}${url}`, options).then(checkResponse<T>);
};

const postRequest = async <T, R>(url: string, body: R): Promise<T> => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			...body,
		}),
	};
	return request<T>(url, options);
};

const refreshToken = async (): Promise<Omit<TUserResponse, 'user'>> => {
	const token = localStorage.getItem('refreshToken');
	try {
		return postRequest<Omit<TUserResponse, 'user'>, TTokenBody>(tokenUrl, {
			token,
		}).then((refreshData: Omit<TUserResponse, 'user'>) => {
			refreshData.success &&
				localStorage.setItem('refreshToken', refreshData.refreshToken);
			refreshData.success &&
				localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
	} catch (err) {
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		return Promise.reject(err);
	}
};

const setTokens = async (data: TUserResponse) => {
	if (!data.success) {
		return Promise.reject(data);
	}
	localStorage.setItem('refreshToken', data.refreshToken);
	localStorage.setItem('accessToken', data.accessToken);
	return data;
};

const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	try {
		return await request<T>(url, options);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData: Omit<TUserResponse, 'user'> = await refreshToken();
			if (refreshData && refreshData.accessToken) {
				options.headers = {
					...options.headers,
					Authorization: refreshData.accessToken,
				};
				return await request<T>(url, options);
			} else {
				return Promise.reject(err);
			}
		} else {
			return Promise.reject(err);
		}
	}
};

const getIngredients = (): Promise<TIngredientsResponse> => {
	return request<TIngredientsResponse>(ingredientsUrl);
};

const addOrder = async (ingredients: string[]): Promise<TOrderResponse> => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: accessToken,
			},
			body: JSON.stringify({
				ingredients: ingredients,
			}),
		};
		return fetchWithRefresh<TOrderResponse>(orderUrl, options);
	}
	return Promise.reject('no access token');
};

const login = async (form: Omit<IUserWithPassword, 'name'>): Promise<TUser> => {
	return postRequest<TUserResponse, Omit<IUserWithPassword, 'name'>>(
		loginUrl,
		form
	)
		.then(setTokens)
		.then((data) => data.user);
};

const register = async (form: IUserWithPassword): Promise<TUser> => {
	return postRequest<TUserResponse, IUserWithPassword>(registerUrl, form)
		.then(setTokens)
		.then((data) => data.user);
};

const getUser = async (): Promise<TUser> => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};
		return fetchWithRefresh<Pick<TUserResponse, 'user' | 'success'>>(
			userUrl,
			options
		).then((data) => data && data.user);
	}
	return Promise.reject('no access token');
};

const patchUser = async (form: IUserWithPassword): Promise<TUser> => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		const options: RequestInit = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: accessToken,
			},
			body: JSON.stringify({
				...form,
			}),
		};
		return fetchWithRefresh<Pick<TUserResponse, 'user' | 'success'>>(
			userUrl,
			options
		).then((data) => data && data.user);
	}
	return Promise.reject('no access token');
};

const logout = async (): Promise<void> => {
	const body: TTokenBody = {
		token: localStorage.getItem('refreshToken'),
	};
	return postRequest<TResponse, TTokenBody>(logoutUrl, body).then((data) => {
		if (data.success) {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
		}
	});
};

const forgotPassword = async (form: TForgotPasswordBody): Promise<void> => {
	return postRequest<TResponse, TForgotPasswordBody>(
		passwordResetUrl,
		form
	).then((data) => {
		if (data.success) {
			localStorage.setItem('resetPassword', 'true');
		}
	});
};

const resetPassword = async (form: TResetPasswordBody): Promise<void> => {
	return postRequest<TResponse, TResetPasswordBody>(resetUrl, form).then(
		(data) => {
			if (data.success) {
				localStorage.removeItem('resetPassword');
			}
		}
	);
};

export const api = {
	getUser,
	patchUser,
	login,
	logout,
	register,
	addOrder,
	getIngredients,
	forgotPassword,
	resetPassword,
};
