import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigation } from './navigation/navigation';
import { NavigationItem } from './navigation-item/navigation-item';
import styles from './app-header.module.scss';
import { useAppSelector } from '../../utils/hooks';
import { getUser } from '../../services/user/reducer';
import React from 'react';
import { Link } from 'react-router-dom';
import { TUser } from '../../models/user.model';

export const AppHeader = (): React.JSX.Element => {
	const user: TUser | null = useAppSelector(getUser);
	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<div className={styles.container}>
				<Navigation />
				<Link to={'/'}>
					<Logo />
				</Link>
				<div className={styles.account}>
					<NavigationItem
						title={user ? user.name : 'Личный кабинет'}
						link='/profile'
						icon='ProfileIcon'
					/>
				</div>
			</div>
		</header>
	);
};
