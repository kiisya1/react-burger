import {
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigation } from './navigation/navigation';
import { NavigationItem } from './navigation-item/navigation-item';
import styles from './app-header.module.scss';

export const AppHeader = () => {
	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<div className={styles.container}>
				<Navigation />
				<Logo />
				<div className={styles.account}>
					<NavigationItem title='Личный кабинет' inactive={true}>
						<ProfileIcon type='secondary' />
					</NavigationItem>
				</div>
			</div>
		</header>
	);
};
