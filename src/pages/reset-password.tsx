import React, { useCallback, useState } from 'react';
import styles from './pages.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

type TResetPasswordFormState = {
	token: string;
	password: string;
};

type TFormErrorState = { [field in keyof TResetPasswordFormState]: boolean };

export const ResetPassword = (): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const [state, setState] = useState<TResetPasswordFormState>({
		password: '',
		token: '',
	});
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const [errorState, setErrorState] = useState<TFormErrorState>({
		password: false,
		token: false,
	});

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setState({
				...state,
				[event.target.name]: event.target.value,
			});
			setErrorState({
				...errorState,
				[event.target.name]: !event.target.value,
			});
		},
		[errorState, state]
	);

	const onIconClick = useCallback(() => {
		setIsHidden(!isHidden);
	}, [isHidden]);

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			if (state.password && state.token) {
				api.resetPassword(state).then(() => {
					navigate('/login', { state: { from: location.state?.from } });
				});
			} else {
				setErrorState({
					password: !state.password,
					token: !state.token,
				});
			}
		},
		[state, navigate, location]
	);

	const isResetPassword = localStorage.getItem('resetPassword');

	if (isResetPassword) {
		return (
			<div className={styles.wrapper}>
				<h2 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h2>
				<form className={styles.form} onSubmit={onSubmit}>
					<Input
						type={isHidden ? 'password' : 'text'}
						placeholder='Введите новый пароль'
						onChange={onInputChange}
						icon={isHidden ? 'ShowIcon' : 'HideIcon'}
						value={state.password}
						name={'password'}
						onIconClick={onIconClick}
						error={errorState.password}
						errorText={'Обязательное поле'}
						size='default'
						extraClass='mb-6'
					/>
					<Input
						type='text'
						placeholder='Введите код из письма'
						onChange={onInputChange}
						value={state.token}
						name='token'
						error={errorState.token}
						errorText={'Обязательное поле'}
						size='default'
						extraClass='mb-6'
					/>
					<Button
						extraClass='mb-20'
						htmlType='submit'
						type='primary'
						size='medium'>
						Сохранить
					</Button>
				</form>
				<p
					className={`${styles.link} text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{' '}
					<Link to='/login' state={{ from: location.state?.from }}>
						<span className='text text_type_main-default'>Войти</span>
					</Link>
				</p>
			</div>
		);
	} else {
		return (
			<Navigate to='/forgot-password' state={{ from: location.state?.from }} />
		);
	}
};
