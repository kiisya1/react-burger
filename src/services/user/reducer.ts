import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { checkUserAuth, login, logout, register, updateUser } from './actions';
import { TUser } from '../../models/user.model';

type UserState = {
	user: TUser | null;
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
		setUserIsUpdated: (state, action: PayloadAction<boolean>) => {
			state.isUpdated = action.payload;
		},
	},
	selectors: {
		getIsAuthChecked: (state: UserState) => state.isAuthChecked,
		getUser: (state): TUser | null => state.user,
		getUserIsUpdated: (state: UserState) => state.isUpdated,
		getUserIsUpdating: (state: UserState) => state.isUpdating,
	},
	extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
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
			.addCase(updateUser.fulfilled, (state: UserState, action) => {
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
			.addCase(checkUserAuth.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(checkUserAuth.rejected, (state) => {
				state.user = null;
				state.isAuthChecked = true;
			});
	},
});

export const { setIsAuthChecked, setUserIsUpdated } = userSlice.actions;
export const {
	getIsAuthChecked,
	getUser,
	getUserIsUpdating,
	getUserIsUpdated,
} = userSlice.selectors;
