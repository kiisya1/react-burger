import { TUser } from './user.model';
import { TIngredient } from './ingredient.model';
import { TOrder } from './order.model';

export type TForgotPasswordBody = {
	email: string;
};

export type TTokenBody = {
	token: string | null;
};

export type TResetPasswordBody = {
	password: string;
	token: string;
};

export type TResponse = {
	success: boolean;
	message: string;
};

export type TUserResponse = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
};

export type TOrderResponse = {
	order: TOrder;
};

export type TIngredientsResponse = {
	data: TIngredient[];
};

export type TOrderListResponse = {
	orders: TOrder[];
	success: boolean;
	total: number;
	totalToday: number;
};

export type TOrderInfoResponse = {
	orders: TOrder[];
	success: boolean;
};

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}
