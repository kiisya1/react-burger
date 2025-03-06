import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.scss';
import { useAppDispatch } from '../../utils/hooks';
import { logout } from '../../services/user/actions';
import React from 'react';

export const Profile = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const onExit = (): void => {
		dispatch(logout());
	};

	return (
		<div className={styles.wrapper}>
			<div>
				<ul className={styles.navigation}>
					<li className={styles.link}>
						<NavLink to='/profile' end>
							{({ isActive }) => (
								<span
									className={`text text_type_main-medium ${
										isActive ? styles.active : ''
									}`}>
									{'Профиль'}
								</span>
							)}
						</NavLink>
					</li>
					<li className={styles.link}>
						<NavLink to='orders'>
							{({ isActive }) => (
								<span
									className={`text text_type_main-medium ${
										isActive ? styles.active : ''
									}`}>
									{'История заказов'}
								</span>
							)}
						</NavLink>
					</li>
					<li className={styles.link}>
						<span
							className={`${styles.exit} text text_type_main-medium`}
							onClick={onExit}>
							Выход
						</span>
					</li>
				</ul>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<Outlet />
		</div>
	);
};
