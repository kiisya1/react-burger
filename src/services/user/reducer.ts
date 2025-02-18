import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkUserAuth, login, logout, register, updateUser } from './actions';
import { User } from '../../models/user.model';

type UserState = {
	user: User | null;
	isAuthChecked: boolean;
	isUpdated: boolean;
	isUpdating: boolean;
	error: string | null;
};

const initialState: UserState = {
	user: null,
	isAuthChecked: false,
	isUpdated: false,
	isUpdating: false,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		setUserIsUpdated: (state, action: PayloadAction<boolean>) => {
			state.isUpdated = action.payload;
		},
	},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUser: (state) => state.user,
		getUserIsUpdated: (state) => state.isUpdated,
		getUserIsUpdating: (state) => state.isUpdating,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isUpdating = false;
				state.isUpdated = true;
			})
			.addCase(updateUser.pending, (state) => {
				state.isUpdating = true;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isUpdating = false;
			})
			.addCase(
				checkUserAuth.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload;
					state.isAuthChecked = true;
				}
			)
			.addCase(checkUserAuth.rejected, (state) => {
				state.user = null;
				state.isAuthChecked = true;
			});
	},
});

export const { setIsAuthChecked, setUser, setUserIsUpdated } =
	userSlice.actions;
export const {
	getIsAuthChecked,
	getUser,
	getUserIsUpdating,
	getUserIsUpdated,
} = userSlice.selectors;
