import styles from './navigation-item.module.scss';
import { NavLink } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

type TNavigationItem = {
	title: string;
	link: string;
	icon: string;
};

export const NavigationItem = (props: TNavigationItem): React.JSX.Element => {
	return (
		<NavLink
			to={props.link}
			className={`${styles.navigation_item} pl-5 pr-5 pb-4 pt-4`}>
			{({ isActive }) => (
				<>
					{props.icon === 'BurgerIcon' && (
						<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
					)}
					{props.icon === 'ListIcon' && (
						<ListIcon type={isActive ? 'primary' : 'secondary'} />
					)}
					{props.icon === 'ProfileIcon' && (
						<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
					)}
					<p
						className={`text text_type_main-default ${
							isActive ? '' : 'text_color_inactive'
						} ml-2`}>
						{props.title}
					</p>
				</>
			)}
		</NavLink>
	);
};
