import { createAction } from '@reduxjs/toolkit';
import { TOrderListResponse } from '../../models/api.model';

export const profileConnect = createAction<
	string,
	'profile-order-list/onConnect'
>('profile-order-list/onConnect');
export const profileDisconnect = createAction(
	'profile-order-list/onDisconnect'
);

export const onProfileConnecting = createAction(
	'profile-order-list/onConnecting'
);
export const onProfileOpen = createAction('profile-order-list/onOpen');
export const onProfileError = createAction<
	string,
	'profile-order-list/onError'
>('profile-order-list/onError');
export const onProfileClose = createAction('profile-order-list/onClose');
export const onProfileMessage = createAction<
	TOrderListResponse,
	'profile-order-list/onMessage'
>('profile-order-list/onMessage');
