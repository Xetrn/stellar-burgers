import { ApiRoutes } from '../../../mocs/handlers';
import { addItem, isConstructorEmpty } from './utils';

describe('Изменение ингредиентов в конструкторе', () => {
  beforeEach(() => {
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Изначально конструктор пустой', () => {
    isConstructorEmpty();
  });

  it('Начинка добавляется в конструктор', () => {
    addItem(`Соус 1`);

    cy.get(`[data-cy='middle']`).contains('Соус 1');
  });

  it('Больше одной начинки добавляется в конструктор в нужном порядке', () => {
    addItem('Соус 1');
    addItem('Основное 1');

    cy.get(`[data-cy='middle-1']`).should('exist').contains('Основное 1');
  });

  it('Булка добавляется в конструктор ', () => {
    addItem('Булка 1');
    cy.get(`[data-cy='top']`).contains('Булка 1');
    cy.get(`[data-cy='bottom']`).contains('Булка 1');
  });

  it('При удалении индексы смещаются', () => {
    addItem('Соус 1');
    addItem('Основное 1');

    cy.get(`[data-cy='middle-inner-0']`)
      .find('.constructor-element__action')
      .click();

    cy.get(`[data-cy='middle-1']`).should('not.exist');
    cy.get(`[data-cy='middle-0']`);
  });

  it('Удаление работает', () => {
    addItem('Соус 1');
    cy.get(`[data-cy='middle-inner-0']`)
      .find('.constructor-element__action')
      .click();

    cy.get(`[data-cy='middle-0']`).should('not.exist');
    cy.get(`[data-cy='middle']`).contains('Выберите начинку');
  });
});
