import styles from './pages.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { register } from '../services/user/actions';

type TRegisterFormState = {
	email: string;
	password: string;
	name: string;
};

type TFormErrorState = { [field in keyof TRegisterFormState]: boolean };

export const Register = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [state, setState] = useState<TRegisterFormState>({
		email: '',
		password: '',
		name: '',
	});
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const onIconClick = useCallback(() => {
		setIsHidden(!isHidden);
	}, [isHidden]);

	const [errorState, setErrorState] = useState<TFormErrorState>({
		password: false,
		email: false,
		name: false,
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
			if (state.password && state.email && state.name) {
				dispatch(register(state));
			} else {
				setErrorState({
					password: !state.password,
					email: !state.email,
					name: !state.name,
				});
			}
		},
		[dispatch, state]
	);

	return (
		<div className={styles.wrapper}>
			<h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type='text'
					placeholder='Имя'
					onChange={onInputChange}
					value={state.name}
					name='name'
					error={errorState.name}
					errorText={'Обязательное поле'}
					size='default'
					extraClass='mb-6'
				/>
				<Input
					type='email'
					placeholder='E-mail'
					onChange={onInputChange}
					value={state.email}
					name='email'
					error={errorState.email}
					errorText={'Обязательное поле'}
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
					error={errorState.password}
					errorText={'Обязательное поле'}
					size='default'
					extraClass='mb-6'
				/>
				<Button
					extraClass='mb-20'
					htmlType='submit'
					type='primary'
					size='medium'>
					Зарегистрироваться
				</Button>
			</form>
			<p
				className={`${styles.link} text text_type_main-default text_color_inactive`}>
				Уже зарегистрированы?{' '}
				<Link to='/login' state={{ from: location.state?.from }}>
					<span className='text text_type_main-default'>Войти</span>
				</Link>
			</p>
		</div>
	);
};
