import { ConstructorItemProps } from '../../../models/burger-constructor.model';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-item.module.scss';

export const ConstructorItem = (props: ConstructorItemProps) => {
	return (
		<div
			className={`${styles.constructor_item} ${
				props.isLocked ? styles.constructor_item__locked : ''
			}`}>
			{!props.isLocked && <DragIcon type='primary' />}
			<ConstructorElement
				type={props.type}
				isLocked={props.isLocked}
				text={props.text}
				price={props.price}
				thumbnail={props.thumbnail}
			/>
		</div>
	);
};
