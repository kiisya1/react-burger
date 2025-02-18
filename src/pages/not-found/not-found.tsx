import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import styles from './not-found.module.scss';

export const NotFound = () => {
	const navigate: NavigateFunction = useNavigate();
	const onClick = useCallback((): void => {
		navigate('/', { replace: true });
	}, [navigate]);

	return (
		<div className={styles.not_found}>
			<p className='text text_type_digits-large'>404</p>
			<p className='text text_type_main-medium'>Страница не найдена</p>
			<Button
				htmlType='button'
				type='secondary'
				size='medium'
				onClick={onClick}>
				На главную
			</Button>
		</div>
	);
};
