import { ApiRoutes } from '../../../mocs/handlers';
import { addItem, isConstructorEmpty } from './utils';

describe('Создание заказа', () => {
  const mockAccessToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTlkYzMxZTM2N2RlMDAxZGFmODczZCIsImlhdCI6MTczNDUzNDc4MywiZXhwIjoxNzM0NTM1OTgzfQ.HRuItaK8J8T8OQn4VA8_CRlJsHWG3pzddzNHXG_iz80';
  const mockRefreshToken =
    '8d148a758eabbe5a1ed98c113fa586ff380e936e5b73a2fdcadec2d5767ef8d8d7ef8082b61cced3';

  beforeEach(() => {
    cy.intercept('GET', ApiRoutes.getIngredients, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', ApiRoutes.postOrder, {
      fixture: 'postOrderResponse.json'
    }).as('postOrder');

    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Если пользователь не авторизован, происходит переадресация на вход', () => {
    cy.intercept('GET', ApiRoutes.getUser, {
      fixture: 'userEmpty.json',
      statusCode: 401
    }).as('getUnauthUser');

    cy.wait('@getUnauthUser');

    addItem('Соус 1');
    addItem('Основное 1');
    addItem('Булка 1');

    cy.get("[data-cy='order-button']").should('exist').click();

    cy.url().should('eq', 'http://localhost:4000/login');
  });

  it('Заказ создаётся при авторизованном пользователе и закрывается с очищением конструктора', () => {
    cy.intercept('GET', ApiRoutes.getUser, {
      headers: {
        authorization: mockAccessToken
      },
      fixture: 'user.json'
    }).as('getUserAuthorized');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', mockRefreshToken);
    });
    cy.setCookie('accessToken', mockAccessToken);

    cy.reload();

    cy.wait('@getUserAuthorized');
    addItem('Соус 1');
    addItem('Основное 1');
    addItem('Булка 1');
    cy.get("[data-cy='order-button']").should('exist').click();

    const modal = cy.get("[data-cy='modal']").should('contain', '4');
    modal.find('button').click();
    modal.should('not.exist');
    isConstructorEmpty();
  });
});
