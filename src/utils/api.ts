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
import { UserWithPassword } from '../models/user.model';

const checkResponse = async (res: Response) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = async (url: string, options?: RequestInit) => {
	return fetch(`${baseUrl}${url}`, options).then(checkResponse);
};

const postRequest = async (url: string, body: any) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			...body,
		}),
	};
	return request(url, options);
};

const refreshToken = async () => {
	const token = localStorage.getItem('refreshToken');
	try {
		return postRequest(tokenUrl, { token }).then((refreshData) => {
			if (refreshData.success) {
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			}
		});
	} catch (err) {
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		return Promise.reject(err);
	}
};

const setTokens = async (data: any) => {
	if (!data.success) {
		return Promise.reject(data);
	}
	localStorage.setItem('refreshToken', data.refreshToken);
	localStorage.setItem('accessToken', data.accessToken);
	return data;
};

const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		return await request(url, options);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...options.headers,
				Authorization: refreshData.accessToken,
			};
			return await request(url, options);
		} else {
			return Promise.reject(err);
		}
	}
};

const getIngredients = () => {
	return request(ingredientsUrl);
};

const addOrder = async (ingredients: string[]) => {
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
		return fetchWithRefresh(orderUrl, options);
	}
};

const login = async (form: any) => {
	return postRequest(loginUrl, form)
		.then(setTokens)
		.then((data) => data.user);
};

const register = async (form: any) => {
	return postRequest(registerUrl, form)
		.then(setTokens)
		.then((data) => data.user);
};

const getUser = async () => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};
		return fetchWithRefresh(userUrl, options).then((data) => data.user);
	}
};

const patchUser = async (form: UserWithPassword) => {
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
		return fetchWithRefresh(userUrl, options).then((data) => data.user);
	}
};

const logout = async () => {
	const body = {
		token: localStorage.getItem('refreshToken'),
	};
	return postRequest(logoutUrl, body).then((data) => {
		if (data.success) {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
		}
	});
};

const forgotPassword = async (form: any) => {
	return postRequest(passwordResetUrl, form).then((data) => {
		if (data.success) {
			localStorage.setItem('resetPassword', 'true');
		}
	});
};

const resetPassword = async (form: any) => {
	return postRequest(resetUrl, form).then((data) => {
		if (data.success) {
			localStorage.removeItem('resetPassword');
		}
	});
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
