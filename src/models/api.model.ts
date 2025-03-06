import { TUser } from './user.model';
import { TIngredient } from './ingredient.model';

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

export type TOrder = {
	number: number;
	name: string;
	status: string;
	price: string;
	createdAt: string;
	ingredients: ReadonlyArray<TIngredient>;
};

export type TOrderResponse = {
	order: TOrder;
};

export type TIngredientsResponse = {
	data: TIngredient[];
};
