import { createAction } from '@reduxjs/toolkit';
import { TOrderListResponse } from '../../models/api.model';

export const connect = createAction<string, 'order-list/onConnect'>(
	'order-list/onConnect'
);
export const disconnect = createAction('order-list/onDisconnect');

export const onConnecting = createAction('order-list/onConnecting');
export const onOpen = createAction('order-list/onOpen');
export const onError = createAction<string, 'order-list/onError'>(
	'order-list/onError'
);
export const onClose = createAction('order-list/onClose');
export const onMessage = createAction<
	TOrderListResponse,
	'order-list/onMessage'
>('order-list/onMessage');
