import {
	addBun,
	addIngredient,
	burgerConstructorSlice,
	clearConstructor,
	initialState,
	removeIngredient,
	sortIngredient,
} from './reducer';
import { TConstructorIngredient } from '../../models/constructor-ingredient.model';

const bun: TConstructorIngredient = {
	text: 'Краторная булка N-200i',
	price: 1255,
	thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png',
	ingredientId: '100',
	id: '100',
};

const main: TConstructorIngredient = {
	text: 'Биокотлета из марсианской Магнолии',
	thumbnail: 'https://code.s3.yandex.net/react/code/meat-01.png',
	ingredientId: '101',
	id: '101',
	price: 424,
};

const sauce: TConstructorIngredient = {
	text: 'Соус Spicy-X',
	thumbnail: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	ingredientId: '123',
	id: '123',
	price: 90,
};

describe('Burger constructor store and actions', () => {
	it('should return the initial state', () => {
		expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should add bun', () => {
		const action = { type: addBun.type, payload: bun };
		expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
			...initialState,
			bun: bun,
		});
	});

	it('should add ingredient', () => {
		const action = { type: addIngredient.type, payload: main };
		expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
			...initialState,
			ingredients: [main],
		});
	});

	it('should remove ingredient', () => {
		const prevState = {
			...initialState,
			ingredients: [main, sauce],
		};
		const action = { type: removeIngredient.type, payload: '123' };
		expect(burgerConstructorSlice.reducer(prevState, action)).toEqual({
			...initialState,
			ingredients: [main],
		});
	});

	it('should sort ingredients', () => {
		const prevState = {
			...initialState,
			ingredients: [main, sauce],
		};
		const action = {
			type: sortIngredient.type,
			payload: { dragIndex: 1, hoverIndex: 0 },
		};
		expect(burgerConstructorSlice.reducer(prevState, action)).toEqual({
			...initialState,
			ingredients: [sauce, main],
		});
	});

	it('should clear state to initial state', () => {
		const prevState = {
			...initialState,
			bun: bun,
			ingredients: [main, sauce],
		};
		const action = { type: clearConstructor.type };
		expect(burgerConstructorSlice.reducer(prevState, action)).toEqual(
			initialState
		);
	});
});
