import styles from './app-error.module.scss';
import { useAppSelector } from '../../utils/hooks';
import React from 'react';

export const AppError = (): React.JSX.Element => {
	const error: string | null = useAppSelector(
		(state) => state.ingredients.error
	);
	return (
		<div className={`${styles.error} text text_type_main-medium mt-10`}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100'
				height='100'
				viewBox='0 0 24 24'
				fill='#E52B1A'>
				<path d='M12 1C18.083 1 23 5.9291 23 12C23 18.0731 18.083 23 12 23C5.928 23 1 18.0731 1 12C1 5.9291 5.928 1 12 1ZM12 15.2241C11.472 15.2241 11.043 15.6531 11.043 16.1811C11.043 16.7091 11.472 17.1491 12.011 17.1491C12.539 17.1491 12.968 16.7091 12.968 16.1811C12.968 15.6531 12.539 15.2241 12 15.2241ZM12 6.863C11.472 6.863 11.032 7.3041 11.032 7.831V12.693C11.032 13.2221 11.472 13.65 12 13.65C12.528 13.65 12.957 13.2221 12.957 12.693V7.831C12.957 7.3041 12.528 6.863 12 6.863Z'></path>
			</svg>
			<p>
				{`Что-то пошло не так: ${error}.
				Попробуйте перезагрузить страницу или обратитесь в службу поддержки по телефону: +7 (90...`}
			</p>
		</div>
	);
};
