import { useAppSelector } from '../utils/hooks';
import { AppError } from '../components/app-error/app-error';
import { AppLoading } from '../components/app-loading/app-loading';
import { AppMain } from '../components/app-main/app-main';

export const Home = () => {
	const { ingredients, loading, error } = useAppSelector(
		(state) => state.ingredients
	);

	return (
		<>
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
		</>
	);
};
