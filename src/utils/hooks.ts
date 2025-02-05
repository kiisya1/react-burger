import {
	UseDispatch,
	useDispatch,
	UseSelector,
	useSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '../services/store';

export const useAppDispatch: UseDispatch<AppDispatch> =
	useDispatch.withTypes<AppDispatch>();
export const useAppSelector: UseSelector<RootState> =
	useSelector.withTypes<RootState>();
