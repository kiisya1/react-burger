export type TUser = {
	name: string;
	email: string;
};

export interface IUserWithPassword extends TUser {
	password: string;
}
