import * as orderResponse from '../fixtures/order.json';

describe('Тестирование конструктора бургеров', () => {
    beforeEach(() => {
        (cy as any).intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

        cy.visit('/');
    });

    describe('Проверка на добавление ингредиентов', () => {
        it('Проверка на добавление булок', () => {
            // Нажать на кнопку добавления булки
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(1).find('button').click();

            // Проверить, что булка добавилась
            cy.get('[data-cy="constructor"]').find('[data-cy="bun"]').first().should('contain.text', 'булка');
            cy.get('[data-cy="constructor"]').find('[data-cy="bun"]').last().should('contain.text', 'булка');
        });

        it('Проверка на добавление соуса', () => {
            // Добавление соуса
            cy.get(`[data-cy='ingredients']`).eq(2).children().eq(1).find('button').click();

            // Проверить, что добавилось
            cy.get('[data-cy="ingredients"]').contains('Выберите начинку').should('not.exist');
            cy.get('[data-cy="ingredients"]').should('have.length.greaterThan', 0);
        });
    });

    describe('Проверка модального окна ингредиента', () => {
        it('Проверка на открытие', () => {
            // Нажатие на первый ингредиент
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(1).click();

            cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
        });

        it('Проверка на открытие с проверкой контента', () => {
            // Нажатие на первый ингредиент
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(1).click();

            cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
        });

        it('Проверка на закрытие - крестик', () => {
            // Нажатие на первый ингредиент
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(1).click();

            cy.get(`[data-cy='modal']`).find('button').click();

            cy.get(`[data-cy='modal']`).should('not.exist');
        });

        it('Проверка на закрытие - оверлей', () => {
            // Нажатие на первый ингредиент
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(1).click();

            cy.get(`[data-cy='overlay']`).click('top', { force: true });

            cy.get(`[data-cy='modal']`).should('not.exist');
        });
    });

    describe('Проверка процесса создания заказа', () => {
        beforeEach(() => {
            cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
            localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

            (cy as any).intercept('GET', 'api/auth/user', { fixture: 'user' });
            (cy as any).intercept('POST', 'api/orders', { fixture: 'order' });
        });

        it('Проверка создания заказа', () => {
            // Добавление ингредиентов
            cy.get(`[data-cy='ingredients']`).eq(0).children().eq(0).find('button').click();
            cy.get(`[data-cy='ingredients']`).eq(1).children().eq(0).find('button').click();

            // Тык по кнопке "Оформить заказ"
            cy.get('[data-cy="constructor"]').children().last().find('button').click();

            // Проверяется, что модальное окно открылось и номер заказа верный
            cy.get(`[data-cy='modal']`).should('be.visible');
            cy.get('[data-cy="number"]').should('contain.text', orderResponse.order.number);

            // Закрывается модальное окно и проверяется успешность закрытия
            cy.get(`[data-cy='modal']`).find('button').click();
            cy.get(`[data-cy='modal']`).should('not.exist');

            // Проверяется, что конструктор пуст
            cy.get('[data-cy="constructor"]').contains('Выберите булки').should('exist');
            cy.get('[data-cy="constructor"]').contains('Выберите начинку').should('exist');
        });

        afterEach(() => {
            cy.clearCookie('accessToken');
            localStorage.removeItem('refreshToken');
        });
    });
});
