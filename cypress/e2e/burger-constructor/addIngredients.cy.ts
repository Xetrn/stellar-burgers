import { ApiRoutes } from '../../../mocs/handlers';

describe('Изменение ингредиентов в конструкторе', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    });
  });

  it('Изначально конструктор пустой', () => {
    cy.get(`[data-cy='middle']`).contains('Выберите начинку');
    cy.get(`[data-cy='top']`).contains('Выберите булки');
    cy.get(`[data-cy='bottom']`).contains('Выберите булки');
  });

  it('Начинка добавляется в конструктор', () => {
    const main = cy.get(`[data-cy='Соус 1']`);
    const addButton = main.children();
    addButton.closest('button').first().click();
    cy.get(`[data-cy='middle']`).contains('Соус 1');
  });

  it('Больше одной начинки добавляется в конструктор в нужном порядке', () => {
    let main = cy.get(`[data-cy='Соус 1']`);
    let addButton = main.children();
    addButton.closest('button').first().click();
    main = cy.get(`[data-cy='Основное 1']`);
    addButton = main.children();
    addButton.closest('button').first().click();
    cy.get(`[data-cy='middle-1']`).contains('Основное 1');
  });

  it('Булка добавляется в конструктор ', () => {
    let main = cy.get(`[data-cy='Булка 1']`);
    let addButton = main.children();
    addButton.closest('button').first().click();

    cy.get(`[data-cy='top']`).contains('Булка 1');
    cy.get(`[data-cy='bottom']`).contains('Булка 1');
  });

  it('Удаление работает', () => {
    let main = cy.get(`[data-cy='Соус 1']`);
    let addButton = main.children();
    addButton.closest('button').first().click();
    main = cy.get(`[data-cy='Основное 1']`);
    addButton = main.children();
    addButton.closest('button').first().click();
    cy.get(`[data-cy='middle-inner-0']`)
      .find('.constructor-element__action')
      .click();

    cy.get(`[data-cy='middle-1']`).should('not.exist');
    cy.get(`[data-cy='middle-0']`);
  });

  it('При удалении индексы смещаются', () => {
    let main = cy.get(`[data-cy='Соус 1']`);
    let addButton = main.children();
    addButton.closest('button').first().click();
    cy.get(`[data-cy='middle-inner-0']`)
      .find('.constructor-element__action')
      .click();

    cy.get(`[data-cy='middle-0']`).should('not.exist');
    cy.get(`[data-cy='middle']`).contains('Выберите начинку');
  });
});
