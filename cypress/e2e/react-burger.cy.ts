import type {} from 'cypress';
import { ingredientsUrl } from '../../src/constants/api.constants';

describe('React burger constructor', () => {
	beforeEach(() => {
		cy.viewport(1280, 1020);
		cy.intercept('GET', ingredientsUrl, { fixture: 'ingredients' });
		cy.visit('http://localhost:8080/');
		cy.get('[data-testid=ingredient-item]').as('ingredients');
		cy.get('@ingredients').first().as('bun');
		cy.get('@ingredients').eq(2).as('sauce');
		cy.get('@ingredients').eq(6).as('main');
	});

	it('should show and close popup', () => {
		cy.get('@bun').click();

		cy.get('[data-testid=ingredient-details-name]').as('name');
		cy.get('[data-testid=modal]').as('modal');

		cy.get('@name').should('have.text', 'Краторная булка N-200i');
		cy.get('[data-testid=modal-close]').click();
		cy.get('@modal').should('not.exist');

		cy.get('@sauce').click();
		cy.get('@name').should('have.text', 'Соус Spicy-X');
		cy.get('[data-testid=modal-overlay]').click({ force: true });
		cy.get('@modal').should('not.exist');

		cy.get('@main').click();
		cy.get('@name').should('have.text', 'Биокотлета из марсианской Магнолии');
		cy.get('body').type('{esc}');
		cy.get('@modal').should('not.exist');
	});

	it('should DnD ingredients', () => {
		cy.get('[data-testid=ingredients-container]').as('container');
		cy.get('[data-testid=bun-container]').as('bunContainer');

		cy.get('@bun').trigger('dragstart');
		cy.wait(500);
		cy.get('@bunContainer').trigger('drop');

		cy.get('[data-testid=constructor-item]').as('items');

		cy.get('@items').first().contains('Краторная булка N-200i (верх)');
		cy.get('@items').eq(1).contains('Краторная булка N-200i (низ)');
		cy.get('@bun').get('.counter__num').contains('2');

		cy.get('@sauce').trigger('dragstart');
		cy.wait(500);
		cy.get('@container').trigger('drop');
		cy.get('@items').eq(1).contains('Соус Spicy-X');
		cy.get('@sauce').get('.counter__num').contains('1');

		cy.get('@main').trigger('dragstart');
		cy.wait(500);
		cy.get('@container').trigger('drop');
		cy.get('@main').trigger('dragstart');
		cy.wait(500);
		cy.get('@container').trigger('drop');
		cy.get('@items').eq(2).contains('Биокотлета из марсианской Магнолии');
		cy.get('@items').eq(3).contains('Биокотлета из марсианской Магнолии');
		cy.get('@main').get('.counter__num').contains('2');
		cy.get('[data-testid=constructor-price]').contains('3448');
	});
});
