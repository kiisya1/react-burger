export type User = {
	name: string;
	email: string;
};

export interface UserWithPassword extends User {
	password: string;
}
