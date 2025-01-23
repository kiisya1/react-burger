import React from 'react';

export interface ModalProps {
	children?: React.ReactNode;
	title?: string;
	titleStyle?: string;
	onClose: () => void;
}
