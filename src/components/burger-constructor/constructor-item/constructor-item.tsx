import { ConstructorItemProps } from '../../../models/burger-constructor.model';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-item.module.scss';
import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
import {
	sortIngredient,
	removeIngredient,
} from '../../../services/burger-constructor/reducer';
import { useAppDispatch } from '../../../utils/hooks';

interface DragItem {
	index: number;
	id: string;
	type: string;
}

export const ConstructorItem = (props: ConstructorItemProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const deleteIngredient = useCallback(() => {
		dispatch(removeIngredient(props.id));
	}, [dispatch, props.id]);

	const [, drop] = useDrop<DragItem, void>({
		accept: 'constructorItem',
		hover(item: DragItem, monitor) {
			if (!ref.current) {
				return;
			}

			if (typeof props.index === 'number') {
				const dragIndex = item.index;
				const hoverIndex = props.index;

				if (dragIndex === hoverIndex) {
					return;
				}
				const hoverBoundingRect = ref.current?.getBoundingClientRect();
				const hoverMiddleY =
					(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
				const clientOffset = monitor.getClientOffset();
				const hoverClientY =
					(clientOffset as XYCoord).y - hoverBoundingRect.top;
				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return;
				}
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return;
				}

				dispatch(sortIngredient({ dragIndex, hoverIndex }));

				item.index = hoverIndex;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'constructorItem',
		item: () => {
			return { id: props.id, index: props.index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div
			ref={props.dropRef ?? ref}
			style={{ opacity }}
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
				handleClose={deleteIngredient}
			/>
		</div>
	);
};
