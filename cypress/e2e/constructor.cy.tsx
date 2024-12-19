beforeEach(() => {
  cy.intercept(
    { method: 'GET', url: 'api/ingredients' },
    { fixture: 'ingredients.json' }
  ).as('getIngredients');
  cy.intercept(
    { method: 'GET', url: 'api/auth/user' },
    { fixture: 'user.json' }
  ).as('getUser');
  cy.intercept(
    { method: 'POST', url: 'api/orders' },
    { fixture: 'order.json' }
  ).as('postOrder');

  cy.visit('http://localhost:4000/');
  cy.wait('@getIngredients');
  cy.wait('@getUser');

  cy.setCookie('accessToken', 'Bearer%20eyJhbGciOiJ');
  localStorage.setItem('refreshToken', '3160b5d904364dba84');
});

describe('Тестирование работы конструктора бургера', () => {
  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy="ingredient-card"]')
      .contains('Краторная булка N-200i')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('[data-cy="constructor-bun"]').should('have.length', 2);
    cy.get('[data-cy="constructor-bun"]').should(
      'contain.text',
      'Краторная булка N-200i'
    );
  });

  it('Добавление начинки и соуса в конструктор', () => {
    cy.get('[data-cy="ingredient-card"]')
      .contains('Плоды Фалленианского дерева')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('[data-cy="ingredient-card"]')
      .contains('Соус фирменный Space Sauce')
      .parent()
      .find('[type="button"]')
      .click();

    cy.get('ul[data-cy="constructor-ingredient"] li').should('have.length', 2);
    cy.get('ul[data-cy="constructor-ingredient"] li').should(
      'contain.text',
      'Плоды Фалленианского дерева'
    );
    cy.get('ul[data-cy="constructor-ingredient"] li').should(
      'contain.text',
      'Соус фирменный Space Sauce'
    );
  });

  it('Добавление и удаление ингредиентов', () => {
    cy.get('[data-cy="ingredient-card"]').eq(1).find('[type="button"]').click();
    cy.get('[data-cy="ingredient-card"]').eq(3).find('[type="button"]').click();
    cy.get('ul[data-cy="constructor-ingredient"] li').should('have.length', 2);

    cy.get('ul[data-cy="constructor-ingredient"] li')
      .eq(1)
      .find('.constructor-element__action')
      .click();
    cy.get('ul[data-cy="constructor-ingredient"] li').should('have.length', 1);
  });
});

describe('Тестирование работы модального окна', () => {
  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-card"]')
      .contains('Плоды Фалленианского дерева')
      .click();

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should(
      'contain.text',
      'Плоды Фалленианского дерева'
    );
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.get('[data-cy="ingredient-card"]').eq(1).click();
    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal"]').find('[type="button"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.get('[data-cy="ingredient-card"]').eq(4).click();
    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click('right', { force: true });
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');
  });
});

describe('Тестирование работы создания заказа', () => {
  it('Создание заказа и его оформление', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).find('[type="button"]').click();
    cy.get('[data-cy="ingredient-card"]').eq(1).find('[type="button"]').click();
    cy.get('[data-cy="ingredient-card"]').eq(4).find('[type="button"]').click();

    cy.get('[data-cy="constructor-total"]').find('[type="button"]').click();
    cy.wait('@postOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain.text', '63178');

    cy.get('[data-cy="modal"]').find('[type="button"]').click();
    cy.get('[data-cy="ingredient-modal"]').should('not.exist');

    cy.get('[data-cy="constructor"]').should('contain.text', 'Выберите булки');
    cy.get('[data-cy="constructor-ingredient"]').should(
      'contain.text',
      'Выберите начинку'
    );
    cy.get('[data-cy="constructor-ingredient"] li').should('not.exist');
  });
});

after(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});
