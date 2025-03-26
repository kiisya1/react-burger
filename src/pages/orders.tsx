import React, { useEffect } from 'react';
import { OrdersList } from '../components/orders-list/orders-list';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { TOrder } from '../models/order.model';
import { WebsocketStatus } from '../models/api.model';
import { wsProfileOrdersUrl } from '../constants/api.constants';
import {
	getProfileError,
	getProfileOrderList,
	getProfileStatus,
} from '../services/profile-order-list/reducer';
import {
	profileConnect,
	profileDisconnect,
} from '../services/profile-order-list/actions';

export const Orders = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const orders: TOrder[] = useAppSelector(getProfileOrderList);
	const wsStatus: WebsocketStatus = useAppSelector(getProfileStatus);
	const wsError: string | null = useAppSelector(getProfileError);

	useEffect((): (() => void) => {
		const wssUrl = new URL(wsProfileOrdersUrl);
		const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
		token && wssUrl.searchParams.set('token', token);
		dispatch(profileConnect(wssUrl.toString()));
		return () => {
			dispatch(profileDisconnect());
		};
	}, [dispatch]);

	return <OrdersList ordersList={orders} status={wsStatus} error={wsError} />;
};
