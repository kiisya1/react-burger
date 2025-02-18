import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import styles from './user.module.scss';
import {
	getUser,
	getUserIsUpdated,
	getUserIsUpdating,
	setUserIsUpdated,
} from '../../services/user/reducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { updateUser } from '../../services/user/actions';

const initialDisableState = {
	email: true,
	password: true,
	name: true,
};

export const User = () => {
	const dispatch = useAppDispatch();
	const [disabledState, setDisabledState] = useState<Record<string, boolean>>({
		...initialDisableState,
	});

	const user = useAppSelector(getUser);
	const isUpdating = useAppSelector(getUserIsUpdating);
	const isUpdated = useAppSelector(getUserIsUpdated);

	const initialState = useMemo(() => {
		return {
			email: user?.email ?? '',
			password: '',
			name: user?.name ?? '',
		};
	}, [user]);

	const [state, setState] = useState({
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

	const isButtonsShown = useMemo(() => {
		return Object.values(disabledState).some((disabled) => !disabled);
	}, [disabledState]);

	const onDisabledChange = useCallback(
		(field: string) => {
			setDisabledState({
				...disabledState,
				[field]: !disabledState[field],
			});
		},
		[disabledState]
	);

	const onInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setState({
				...state,
				[event.target.name]: event.target.value,
			});
		},
		[state]
	);

	const onSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			dispatch(updateUser(state));
		},
		[dispatch, state]
	);

	const onCancel = useCallback(() => {
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
