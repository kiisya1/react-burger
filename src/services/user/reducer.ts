import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { checkUserAuth, login, logout, register, updateUser } from './actions';
import { TUser } from '../../models/user.model';

type TUserState = {
	user: TUser | null;
	isAuthChecked: boolean;
	isUpdated: boolean;
	isUpdating: boolean;
	error: string | null;
};

export const initialState: TUserState = {
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
		setIsAuthChecked: (state: TUserState, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		setUserIsUpdated: (state: TUserState, action: PayloadAction<boolean>) => {
			state.isUpdated = action.payload;
		},
	},
	selectors: {
		getIsAuthChecked: (state: TUserState) => state.isAuthChecked,
		getUser: (state): TUser | null => state.user,
		getUserIsUpdated: (state: TUserState) => state.isUpdated,
		getUserIsUpdating: (state: TUserState) => state.isUpdating,
	},
	extraReducers: (builder: ActionReducerMapBuilder<TUserState>) => {
		builder
			.addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(register.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(
				updateUser.fulfilled,
				(state: TUserState, action: PayloadAction<TUser>) => {
					state.user = action.payload;
					state.isUpdating = false;
					state.isUpdated = true;
				}
			)
			.addCase(updateUser.pending, (state) => {
				state.isUpdating = true;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isUpdating = false;
			})
			.addCase(
				checkUserAuth.fulfilled,
				(state, action: PayloadAction<TUser>) => {
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

export const { setIsAuthChecked, setUserIsUpdated } = userSlice.actions;
export const {
	getIsAuthChecked,
	getUser,
	getUserIsUpdating,
	getUserIsUpdated,
} = userSlice.selectors;
