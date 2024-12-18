import { ApiRoutes } from '../../../mocs/handlers';

describe('Работа модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', ApiRoutes.getOrder, {
      fixture: 'getOrder.json'
    }).as('getOrder');
    cy.intercept('GET', ApiRoutes.getFeed, {
      fixture: 'feed.json'
    }).as('getFeed');

    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  describe('Модальные окна ингредиентов', () => {
    it('Открывается модальное окно ингредиента', () => {
      let main = cy.get(`[data-cy='Соус 1']`);
      main.click();
      cy.get(`[data-cy='modal']`).should('exist').contains('Соус 1');
    });

    it('Закрывается нажатием esc', () => {
      let main = cy.get(`[data-cy='Соус 1']`);
      main.click();
      cy.get('body').type('{esc}');
      cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Закрывается нажатием на кнопку закрытия', () => {
      let main = cy.get(`[data-cy='Соус 1']`);
      main.click();
      const modal = cy.get(`[data-cy='modal']`);
      modal.find('button').click();
      modal.should('not.exist');
    });

    it('Закрывается нажатием вне области', () => {
      let main = cy.get(`[data-cy='Соус 1']`);
      main.click();

      cy.get('body').click('left');

      cy.get(`[data-cy='modal']`).should('not.exist');
    });
  });

  describe('Модальное окно заказа', () => {
    it('Открывается модальное окно заказа в ленте', () => {
      cy.visit('http://localhost:4000/feed');
      cy.get("[data-cy='order1']").click();
      cy.get("[data-cy='modal']").contains('Заказ');
    });
  });
});
