const selectors = {
  modalOverlay: '[data-cy="modal-overlay"]',
  modal: '[data-cy="modal"]',
  burgerConstructor: '[data-cy="constructor"]',
  ingredient: '[data-cy="ingredient-link-item"]',
  closeButton: '[data-cy="close-button"]',
  createOrderButton: '[data-cy="create-order-button"]'
};

describe('Конструктор бургера и процесс оформления заказа', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', JSON.stringify('refresh_token_mock'));
    cy.setCookie('accessToken', JSON.stringify('access_token_mock'));

    const apiEndpoints = [
      {
        method: 'GET',
        url: 'api/ingredients',
        fixture: 'ingredients.json',
        alias: 'fetchIngredients'
      },
      {
        method: 'GET',
        url: 'api/auth/user',
        fixture: 'user.json',
        alias: 'fetchUserData'
      },
      {
        method: 'POST',
        url: 'api/orders',
        fixture: 'order.json',
        alias: 'createOrder'
      }
    ];

    apiEndpoints.forEach(({ method, url, fixture, alias }) => {
      cy.intercept(method, url, { fixture }).as(alias);
    });

    cy.visit('');
    cy.wait(['@fetchUserData', '@fetchIngredients']);
  });

  describe('Взаимодействия с конструктором бургера', () => {
    it('Добавить ингредиент в конструктор', () => {
      cy.get(selectors.ingredient).first().next().click();
      cy.get(selectors.burgerConstructor).should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(selectors.ingredient).first().click();
      cy.get(selectors.modal).should('exist');
      cy.get(selectors.closeButton).click();
      cy.get(selectors.modal).should('not.exist');
    });

    it('Закрытие модального окна при клике на оверлей', () => {
      cy.get(selectors.ingredient).first().click();
      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modalOverlay).click('top', { force: true });
      cy.get(selectors.modal).should('not.exist');
    });

    it('Создание заказа и проверка поведения модального окна', () => {
      cy.get(selectors.burgerConstructor).as('constructor');
      cy.get(selectors.ingredient).first().next().click();
      cy.get(selectors.ingredient).eq(2).next().click();
      cy.get(selectors.createOrderButton).click();
      cy.wait('@createOrder');

      cy.get(selectors.modal).should('exist').and('contain', '555');
      cy.get(selectors.modalOverlay).click('top', { force: true });
      cy.get(selectors.modal).should('not.exist');
      cy.get('@constructor').should('contain', '');
    });
  });
});
