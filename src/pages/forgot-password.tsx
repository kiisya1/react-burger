import styles from './pages.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { api } from '../utils/api';

type TForgotPasswordFormState = {
	email: string;
};

type TFormErrorState = { [field in keyof TForgotPasswordFormState]: boolean };

export const ForgotPassword = (): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const [state, setState] = useState<TForgotPasswordFormState>({
		email: '',
	});

	const [errorState, setErrorState] = useState<TFormErrorState>({
		email: false,
	});

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
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

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			if (state.email) {
				api.forgotPassword(state).then(() => {
					if (localStorage.getItem('resetPassword')) {
						navigate('/reset-password', {
							state: { from: location.state?.from },
						});
					}
				});
			} else {
				setErrorState({
					email: !state.email,
				});
			}
		},
		[state, navigate, location]
	);

	return (
		<div className={styles.wrapper}>
			<h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type='email'
					placeholder='Укажите e-mail'
					onChange={onInputChange}
					value={state.email}
					name='email'
					error={errorState.email}
					errorText={'Обязательное поле'}
					size='default'
					extraClass='mb-6'
				/>
				<Button
					extraClass='mb-20'
					htmlType='submit'
					type='primary'
					size='medium'>
					Восстановить
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
};
