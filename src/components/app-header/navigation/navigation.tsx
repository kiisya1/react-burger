import {
	BurgerIcon,
	ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavigationItem } from '../navigation-item/navigation-item';
import styles from './navigation.module.scss';

export const Navigation = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<li className={styles.navigation__item}>
					<NavigationItem title='Конструктор'>
						<BurgerIcon type='primary' />
					</NavigationItem>
				</li>
				<li className={styles.navigation__item}>
					<NavigationItem title='Лента заказов' inactive={true}>
						<ListIcon type='secondary' />
					</NavigationItem>
				</li>
			</ul>
		</nav>
	);
};
