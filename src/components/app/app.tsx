import { AppHeader } from '../app-header/app-header';
import styles from './app.module.scss';
import { AppMain } from '../app-main/app-main';
import React, { useEffect } from 'react';
import { AppLoading } from '../app-loading/app-loading';
import { AppError } from '../app-error/app-error';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { loadIngredients } from '../../services/ingredients/actions';

export const App = () => {
	const dispatch = useAppDispatch();
	const { ingredients, loading, error } = useAppSelector(
		(state) => state.ingredients
	);

	useEffect(() => {
		dispatch(loadIngredients());
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			{error ? (
				<AppError />
			) : loading ? (
				<AppLoading />
			) : ingredients.length === 0 ? (
				<h2 className='text text_type_main-large mb-5 pl-5 pr-5'>
					Нет доступных ингредиентов.
				</h2>
			) : (
				ingredients.length > 0 && <AppMain />
			)}
		</div>
	);
};
