import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigation } from './navigation/navigation';
import { NavigationItem } from './navigation-item/navigation-item';
import styles from './app-header.module.scss';
import { useAppSelector } from '../../utils/hooks';
import { getUser } from '../../services/user/reducer';

export const AppHeader = () => {
	const user = useAppSelector(getUser);
	return (
		<header className={`${styles.header} pt-4 pb-4`}>
			<div className={styles.container}>
				<Navigation />
				<Logo />
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
