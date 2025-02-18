import { AppHeader } from '../app-header/app-header';
import styles from './app.module.scss';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
	Home,
	NotFound,
	Login,
	ForgotPassword,
	Register,
	Profile,
	ResetPassword,
	User,
	Orders,
	Ingredient,
} from '../../pages';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import React, { useEffect } from 'react';
import { loadIngredients } from '../../services/ingredients/actions';
import { useAppDispatch } from '../../utils/hooks';
import { Modal } from '../modal/modal';
import { checkUserAuth } from '../../services/user/actions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

export const App = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	useEffect(() => {
		dispatch(loadIngredients());
		dispatch(checkUserAuth());
	}, [dispatch]);

	const closeModal = () => {
		navigate(-1);
	};

	return (
		<div className={styles.wrapper}>
			<AppHeader />
			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
					<Route index element={<OnlyAuth component={<User />} />} />
					<Route path='orders' element={<OnlyAuth component={<Orders />} />} />
				</Route>
				<Route path='/ingredients/:id' element={<Ingredient />} />
				<Route path='*' element={<NotFound />} />
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								onClose={closeModal}
								title='Детали ингредиента'
								titleStyle='text_type_main-large'>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
