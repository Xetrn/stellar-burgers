/// <reference types="cypress" />

import { selectors } from '../support/e2e';

describe('Check the burger constructor', () => {
  beforeEach(() => {
    // Токены для авторизации
    cy.setCookie('accessToken', 'testUserAccessToken');
    localStorage.setItem('refreshToken', 'testUserRefreshToken');

    // Загрузка моков
    cy.fixture('ingredients.json');
    cy.fixture('order.json');
    cy.fixture('user.json');

    // Замена запросов на моки
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');

    cy.visit('/');
  });

  it('Check mocks', () => {
    // Ожидаем завершения перехвата запросов
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  it('There should be no ingredients in the constructor at the start', () => {
    cy.get(selectors.constructor).should('contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });

  it('Add a bun to the constructor', () => {
    // Выбираем булку
    cy.addIngredient(0, -1);

    // Булка появилась в конструкторе
    cy.get(selectors.constructor).should('contain.text', 'Вторая булка');
    cy.get(selectors.constructor).should('not.contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });

  it('Add a filling to the constructor', () => {
    // Выбираем котлету
    cy.addIngredient(1, 0);

    cy.get(selectors.constructor).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(selectors.constructor).should(
      'not.contain.text',
      'Выберите начинку'
    );
  });

  it('Open a modal window with a description of the ingredient', () => {
    cy.openModal('Вторая булка');

    // Модалка открылась
    cy.get(selectors.modalContainer).should('be.visible');
  });

  it('Close a modal with the button', () => {
    cy.openModal('Вторая булка');

    // Закрываем модальное окно нажатием на иконку
    cy.get(selectors.modalContainer).find('button').click();

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('Close a modal with the Esc', () => {
    cy.openModal('Первая булка');

    // Закрываем модальное окно с помощью клавиши Esc
    cy.get('body').type('{esc}');

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('Close a modal with the overlay', () => {
    cy.openModal('Первая булка');

    // Закрываем модальное окно кликом по оверлею
    cy.get(selectors.modalOverlay).click('top', { force: true });

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('Check profile information', () => {
    // Переходим на страницу профиля и проверяем данные
    cy.visit('/profile');
    cy.get(selectors.profileName).should('have.value', 'TestUser');
    cy.get(selectors.profileEmail).should('have.value', 'test@mail.ru');
  });

  it('Check order', () => {
    // Добавляем ингредиенты в заказ
    cy.addIngredient(0, -1);
    cy.addIngredient(1, 0);
    cy.addIngredient(-1, -1);

    // Подтверждаем заказ
    cy.get(selectors.constructor).children().last().find('button').click();

    // Ожидаем окончания запроса на заказ
    cy.wait('@order');

    // Модалка открылась
    cy.get(selectors.modalContainer).should('be.visible');

    // Правильный номер заказа
    cy.get(selectors.modalContainer)
      .children()
      .last()
      .children()
      .first()
      .should('contain.text', '63483');

    // Модалка закрылась
    cy.get(selectors.modalContainer).find('button').click();

    // Пустой конструктор
    cy.get(selectors.constructor).should('contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });
});
