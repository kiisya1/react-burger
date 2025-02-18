import { NavigationItem } from '../navigation-item/navigation-item';
import styles from './navigation.module.scss';

export const Navigation = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<li className={styles.navigation__item}>
					<NavigationItem title='Конструктор' link='/' icon='BurgerIcon' />
				</li>
				<li className={styles.navigation__item}>
					<NavigationItem
						title='Лента заказов'
						icon='ListIcon'
						link='/orders-list'
					/>
				</li>
			</ul>
		</nav>
	);
};
