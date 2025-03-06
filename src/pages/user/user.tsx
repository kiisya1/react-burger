import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './user.module.scss';
import {
	getUser,
	getUserIsUpdated,
	getUserIsUpdating,
	setUserIsUpdated,
} from '../../services/user/reducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { updateUser } from '../../services/user/actions';
import { TUser } from '../../models/user.model';

type TUserFormState = {
	email: string;
	password: string;
	name: string;
};

type TUserFormDisabledState = { [uf in keyof TUserFormState]: boolean };

const initialDisableState: TUserFormDisabledState = {
	email: true,
	password: true,
	name: true,
};

export const User = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const [disabledState, setDisabledState] = useState<TUserFormDisabledState>({
		...initialDisableState,
	});

	const user: TUser | null = useAppSelector(getUser);
	const isUpdating: boolean = useAppSelector(getUserIsUpdating);
	const isUpdated: boolean = useAppSelector(getUserIsUpdated);

	const initialState: TUserFormState = useMemo(() => {
		return {
			email: user?.email ?? '',
			password: '',
			name: user?.name ?? '',
		};
	}, [user]);

	const [state, setState] = useState<TUserFormState>({
		...initialState,
	});

	useEffect(() => {
		if (isUpdated) {
			setDisabledState({
				...initialDisableState,
			});
			dispatch(setUserIsUpdated(false));
		}
	}, [dispatch, isUpdated]);

	const isButtonsShown: boolean = useMemo(() => {
		return Object.values(disabledState).some((disabled) => !disabled);
	}, [disabledState]);

	const onDisabledChange = useCallback(
		(field: keyof TUserFormDisabledState): void => {
			setDisabledState({
				...disabledState,
				[field]: !disabledState[field],
			});
		},
		[disabledState]
	);

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setState({
				...state,
				[event.target.name]: event.target.value,
			});
		},
		[state]
	);

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			dispatch(updateUser(state));
		},
		[dispatch, state]
	);

	const onCancel = useCallback((): void => {
		setState({
			...initialState,
		});
		setDisabledState({
			...initialDisableState,
		});
	}, [initialState]);

	return (
		<div className={styles.wrapper}>
			<form onSubmit={onSubmit}>
				<Input
					type='text'
					placeholder='Имя'
					onChange={onInputChange}
					icon={disabledState.name ? 'EditIcon' : 'CloseIcon'}
					disabled={disabledState.name}
					onIconClick={() => onDisabledChange('name')}
					value={state.name}
					name='name'
					size='default'
					extraClass='mb-6'
				/>
				<Input
					type='email'
					placeholder='Логин'
					icon={disabledState.email ? 'EditIcon' : 'CloseIcon'}
					disabled={disabledState.email}
					onIconClick={() => onDisabledChange('email')}
					onChange={onInputChange}
					value={state.email}
					name='email'
					size='default'
					extraClass='mb-6'
				/>
				<Input
					type='password'
					placeholder='Пароль'
					onChange={onInputChange}
					icon={disabledState.password ? 'EditIcon' : 'CloseIcon'}
					disabled={disabledState.password}
					value={state.password}
					name={'password'}
					onIconClick={() => onDisabledChange('password')}
					size='default'
					extraClass='mb-6'
				/>
				{isButtonsShown && (
					<div className={styles.buttons}>
						<Button
							onClick={onCancel}
							disabled={isUpdating}
							extraClass='mb-20'
							htmlType='button'
							type='secondary'
							size='medium'>
							Отмена
						</Button>
						<Button
							disabled={isUpdating}
							extraClass='mb-20'
							htmlType='submit'
							type='primary'
							size='medium'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};
