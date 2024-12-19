describe('Проверка функциональности конструктора бургеров', () => {
    const fixtures = ['ingredients', 'feed', 'user', 'order'];
    const intercepts = [
      { method: 'GET', url: 'api/ingredients', fixture: 'ingredients.json', alias: 'getIngredients' },
      { method: 'GET', url: 'api/auth/user', fixture: 'user.json', alias: 'user' },
      { method: 'GET', url: 'api/orders/all', fixture: 'feed.json', alias: 'feed' },
      { method: 'POST', url: 'api/orders', fixture: 'order.json', alias: 'order' }
    ];

    beforeEach(() => {
      fixtures.forEach(fixture => cy.fixture(`${fixture}.json`));

      intercepts.forEach(({ method, url, fixture, alias }) =>
        cy.intercept({ method, url }, { fixture }).as(alias)
      );

      cy.setCookie('accessToken', 'mockTokenLayvu');
      localStorage.setItem('refreshToken', 'mockTokenLayvu');

      cy.visit('/');
    });

    it('Проверка корректности перехвата запросов API', () => {
        cy.wait('@getIngredients');
        cy.wait('@user');
    });

    it('Проверка отсутствия булки и начинки в конструкторе при старте', () => {
        cy.get('[data-cy="constructor-module"]')
            .find('[data-cy="bun-top"]')
            .should('not.exist');

        cy.get('[data-cy="constructor-module"]')
            .find('[data-cy="bun-bottom"]')
            .should('not.exist');

        cy.get('[data-cy="constructor-module"]')
            .contains('Выберите булки')
            .should('exist');

        cy.get('[data-cy="constructor-module"]')
            .contains('Выберите начинку')
            .should('exist');
    });

    it('Добавление булки в конструктор', () => {
        cy.get(`[data-cy='ingredients-module']`)
          .first()
          .children()
          .last()
          .find('button')
          .click();

        cy.get('[data-cy="constructor-module"]')
          .find('[data-cy="bun-bottom"]')
          .should('contain.text', 'булка');

        cy.get('[data-cy="constructor-module"]')
          .find('[data-cy="bun-top"]')
          .should('contain.text', 'булка');
    });

    it('Добавление ингредиента в конструктор', () => {
        cy.get(`[data-cy='ingredients-module']`)
          .next()
          .next()
          .children()
          .first()
          .find('button')
          .click();

        cy.get('[data-cy="ingredients-module"]')
          .contains('Выберите начинку')
          .should('not.exist');

        cy.get('[data-cy="ingredients-module"]')
          .should('have.length.greaterThan', 0);
    });

    it('Проверка открытия модального окна при клике на ингредиент', () => {
        cy.get('[data-cy="ingredient"]')
          .first()
          .click();

        cy.get(`[data-cy='modal']`).should('be.visible');
        cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
    });

    it('Проверка закрытия модального окна кнопкой "крестик"', () => {
        cy.get('[data-cy="ingredient"]')
          .first()
          .click();

        cy.get(`[data-cy='modal']`).find('button').click();

        cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Проверка закрытия модального окна с помощью клавиши Esc', () => {
        cy.get('[data-cy="ingredient"]')
          .first()
          .click();

        cy.get('body').type('{esc}');

        cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Проверка закрытия модального окна при клике на оверлей', () => {
        cy.get('[data-cy="ingredient"]')
          .first()
          .click();

        cy.get(`[data-cy='modalOverlay']`).click('top', { force: true });

        cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Проверка авторизации пользователя в профиле', () => {
        cy.visit('/profile');

        cy.get(`[data-cy='input-profile-name'] input`)
          .should('have.value', 'User');
    });

    it('Подтверждение заказа и проверка модального окна', () => {
        // Добавление булки в конструктор
        cy.get(`[data-cy='ingredients-module']`)
          .first()
          .children()
          .last()
          .find('button')
          .click(); 

        // Оформление заказа
        cy.get('[data-cy="constructor-module"]')
          .find('button')
          .click();

          cy.wait('@order').then((interception) => {
            const orderNumber = interception.response?.body?.order?.number;

            cy.get(`[data-cy='modal']`).should('be.visible');

            cy.get('[data-cy="order-number"]').should('contain.text', orderNumber);

            cy.get(`[data-cy='modal']`).find('button').click();

            cy.get(`[data-cy='modal']`).should('not.exist');

            cy.get('[data-cy="constructor-module"]')
              .find('[data-cy="bun-top"]')
              .should('not.exist');

            cy.get('[data-cy="constructor-module"]')
              .find('[data-cy="bun-bottom"]')
              .should('not.exist');

            cy.get('[data-cy="constructor-module"]')
              .contains('Выберите булки')
              .should('exist');

            cy.get('[data-cy="constructor-module"]')
              .contains('Выберите начинку')
              .should('exist');
          });
    });

});
