import { NavigationItemProps } from '../../../models/navigation.model';
import styles from './navigation-item.module.scss';

export const NavigationItem = (props: NavigationItemProps) => {
	return (
		<a
			href={props.link}
			className={`${styles.navigation_item} pl-5 pr-5 pb-4 pt-4`}>
			{props.children}
			<p
				className={`text text_type_main-default ${
					props.inactive ? 'text_color_inactive' : ''
				} ml-2`}>
				{props.title}
			</p>
		</a>
	);
};
