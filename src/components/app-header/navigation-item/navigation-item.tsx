import { NavigationItemProps } from '../../../models/navigation.model';
import styles from './navigation-item.module.scss';
import { useMemo } from 'react';

export const NavigationItem = (props: NavigationItemProps) => {
	const inactiveStyle: string = useMemo(() => {
		return props.inactive ? 'text_color_inactive' : '';
	}, [props.inactive]);

	return (
		<a
			href={props.link}
			className={`${styles.navigation_item} pl-5 pr-5 pb-4 pt-4`}>
			{props.children}
			<p className={`text text_type_main-default ${inactiveStyle} ml-2`}>
				{props.title}
			</p>
		</a>
	);
};
