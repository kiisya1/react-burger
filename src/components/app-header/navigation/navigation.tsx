import { NavigationItem } from '../navigation-item/navigation-item';
import styles from './navigation.module.scss';
import React from 'react';

export const Navigation = (): React.JSX.Element => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<li className={styles.navigation__item}>
					<NavigationItem title='Конструктор' link='/' icon='BurgerIcon' />
				</li>
				<li className={styles.navigation__item}>
					<NavigationItem title='Лента заказов' icon='ListIcon' link='/feed' />
				</li>
			</ul>
		</nav>
	);
};
