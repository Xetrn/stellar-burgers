describe('Страница конструктора', () => {
  describe('Без авторизации', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('http://localhost:4000');
    });

    describe('Сборка бургера', () => {
      it('Должен добавлять ингридиенты в конструктор при клике на кнопку добавления ингредиента', () => {
        cy.contains('Биокотлета из марсианской Магнолии')
          .parent()
          .find('button')
          .click();

        cy.contains('Краторная булка N-200i').parent().find('button').click();

        cy.contains('Оформить заказ')
          .parent()
          .parent('section')
          .within(() => {
            cy.contains('Биокотлета из марсианской Магнолии').should('exist');
            cy.contains('Краторная булка N-200i').should('exist');
            cy.contains('2934').should('exist');
          });
      });

      it('Должен удалять ингридиенты из конструктора при клике на кнопку удаления ингредиента', () => {
        cy.contains('Биокотлета из марсианской Магнолии')
          .parent()
          .find('button')
          .click();

        cy.contains('Краторная булка N-200i').parent().find('button').click();

        cy.contains('Оформить заказ')
          .parent()
          .parent('section')
          .within(() => {
            cy.contains('Биокотлета из марсианской Магнолии')
              .parent()
              .find('.constructor-element__action')
              .click();

            cy.contains('2510').should('exist');
          });
      });
    });

    describe('Модальное окно ингредиента', () => {
      beforeEach(() => {
        cy.contains('Биокотлета из марсианской Магнолии').parent().click();
      });

      it('Должен открывать модальное окно при клике на карточку ингридиента', () => {
        cy.get('#modals')
          .contains('Биокотлета из марсианской Магнолии')
          .should('exist');
      });

      it('Должен закрывать модальное окно при клике на крестик', () => {
        cy.get('#modals').find('button').click();

        cy.get('#modals').should('not.contain.html');
      });

      it('Должен закрывать модальное окно при клике вне окна', () => {
        cy.get('#modals').parent().click('topRight');
      });
    });
  });

  describe('С авторизацией', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'testAccessToken');

      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'testRefresh');
      });

      cy.intercept('GET', '/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');
      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('http://localhost:4000');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');

      cy.window().then((window) => {
        window.localStorage.removeItem('refreshToken');
      });
    });

    it('Должен делать заказ', () => {
      cy.intercept('POST', '/api/orders', {
        fixture: 'order.json',
        delay: 100
      }).as('postOrder');

      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click();

      cy.contains('Краторная булка N-200i').parent().find('button').click();

      cy.contains('Оформить заказ').click();

      cy.contains('Оформляем заказ...').should('exist');

      cy.wait('@postOrder').then(() => {
        cy.get('#modals').contains('63217').should('exist');
        cy.get('#modals').parent().click('topRight');
        cy.get('#modals').should('not.contain.html');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');

        cy.contains('Оформить заказ').parent().contains('0').should('exist');
      });
    });
  });
});
