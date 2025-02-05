import { baseUrl, orderUrl } from '../constants/api.constants';

const checkResponse = (res: Response) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = (api: string) => {
	return fetch(`${baseUrl}${api}`).then(checkResponse);
};

export const addOrder = (ingredients: string[]) => {
	return fetch(`${baseUrl}${orderUrl}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ingredients,
		}),
	}).then(checkResponse);
};
