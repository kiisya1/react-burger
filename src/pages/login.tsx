import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './pages.module.scss';
import { useAppDispatch } from '../utils/hooks';
import { login } from '../services/user/actions';

type TLoginFormState = {
	email: string;
	password: string;
};

type TFormErrorState = { [field in keyof TLoginFormState]: boolean };

export const Login = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [state, setState] = useState<TLoginFormState>({
		email: '',
		password: '',
	});
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const onIconClick = useCallback(() => {
		setIsHidden(!isHidden);
	}, [isHidden]);

	const [errorState, setErrorState] = useState<TFormErrorState>({
		password: false,
		email: false,
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

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			if (state.password && state.email) {
				dispatch(login(state));
			} else {
				setErrorState({
					password: !state.password,
					email: !state.email,
				});
			}
		},
		[dispatch, state]
	);

	return (
		<div className={styles.wrapper}>
			<h2 className='text text_type_main-medium mb-6'>Вход</h2>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type='email'
					placeholder='E-mail'
					onChange={onInputChange}
					value={state.email}
					name='email'
					error={false}
					errorText={'Введите корректный email'}
					size='default'
					extraClass='mb-6'
				/>
				<Input
					type={isHidden ? 'password' : 'text'}
					placeholder='Пароль'
					onChange={onInputChange}
					icon={isHidden ? 'ShowIcon' : 'HideIcon'}
					value={state.password}
					name={'password'}
					onIconClick={onIconClick}
					error={false}
					errorText={'Обязательное поле'}
					size='default'
					extraClass='mb-6'
				/>
				<Button
					extraClass='mb-20'
					htmlType='submit'
					type='primary'
					size='medium'>
					Войти
				</Button>
			</form>
			<p
				className={`${styles.link} text text_type_main-default text_color_inactive mb-4`}>
				Вы — новый пользователь?{' '}
				<Link to='/register' state={{ from: location.state?.from }}>
					<span className='text text_type_main-default'>
						Зарегистрироваться
					</span>
				</Link>
			</p>
			<p
				className={`${styles.link} text text_type_main-default text_color_inactive`}>
				Забыли пароль?{' '}
				<Link to='/forgot-password' state={{ from: location.state?.from }}>
					<span className='text text_type_main-default'>
						Восстановить пароль
					</span>
				</Link>
			</p>
		</div>
	);
};
