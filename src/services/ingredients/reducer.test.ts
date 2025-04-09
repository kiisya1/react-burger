import { errorText, ingredientsSlice, initialState } from './reducer';
import { loadIngredients } from './actions';
import { IngredientType, TIngredient } from '../../models/ingredient.model';

const ingredient: TIngredient = {
	_id: '1',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: IngredientType.MAIN,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
};
const ingredients: TIngredient[] = [ingredient];

describe('Burger ingredients store and actions', () => {
	it('should return the initial state', () => {
		expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should load and save ingredients', () => {
		const prevState = {
			...initialState,
			loading: true,
		};
		const action = {
			type: loadIngredients.fulfilled.type,
			payload: { data: ingredients },
		};
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...initialState,
			ingredients: ingredients,
			ingredientsMap: {
				'1': ingredient,
			},
		});
	});

	it('should change loading', () => {
		const action = { type: loadIngredients.pending.type };
		expect(ingredientsSlice.reducer(initialState, action)).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should set error', () => {
		const prevState = {
			...initialState,
			loading: true,
		};
		const action = { type: loadIngredients.rejected.type };
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...initialState,
			error: errorText,
		});
	});
});
