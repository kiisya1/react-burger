import { AppHeader } from '../app-header/app-header';
import styles from './app.module.scss';
import { AppMain } from '../app-main/app-main';
import React, { useEffect, useState } from 'react';
import { Ingredient } from '../../models/ingredient.model';
import { apiRoute } from '../../constants/api.constants';
import { getIngredients } from '../../utils/burger-api';
import { AppLoading } from '../app-loading/app-loading';
import { AppError } from '../app-error/app-error';

export const App = () => {
	const [ingredients, setIngredients]: [
		Ingredient[] | null,
		React.Dispatch<React.SetStateAction<Ingredient[] | null>>
	] = useState<Ingredient[] | null>(null);
	const [loading, setLoading]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);
	const [error, setError]: [
		string | null,
		React.Dispatch<React.SetStateAction<string | null>>
	] = useState<string | null>(null);

	useEffect(() => {
		setError(null);
		(async () => {
			try {
				setLoading(true);
				const response = await getIngredients(apiRoute);
				setIngredients(response.data as unknown as Ingredient[]);
				setLoading(false);
			} catch (error) {
				setError((error as Error).message ?? 'unknown error');
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			{error ? (
				<AppError error={error} />
			) : loading ? (
				<AppLoading />
			) : (
				ingredients &&
				ingredients.length > 0 && <AppMain ingredients={ingredients} />
			)}
		</div>
	);
};
