const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIAxZDM3MGRmMyIsImlhdCI6MTczNDYyNTQzNywiZXhwIjoxNzM0NjI2NjM3fQ.QjEd_NNfxhlmgD0cPeGqMI9beeczXGi-hwTdM1YWbNQ';
const refreshToken = '237f2acf855fe8a753b531700fd5e65da0294655a621902533a5334';

const profile = "[data-cy='profile']";

const burgerConstructor = "[data-cy='burger-constructor']";
const burgerIngredients = "[data-cy='burger-ingredients']";
const submitBtn = "[data-cy='submit-order-button']";

const ingredient = '[data-cy="643d69a5c3f7b9001cfa093f"]';
const bun = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const sauce = '[data-cy="643d69a5c3f7b9001cfa0945"]';
const ingredientLink = "[data-cy='ingredient-link']";

const modalContent = "[data-cy='modal-content']";
const modalOverlay = "[data-cy='modal-overlay']";
const modalCloseBtn = "[data-cy='modal-close-btn']";

beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('fetchIngredients');

  cy.intercept('POST', '/api/orders', {
    fixture: 'order.json'
  }).as('createOrder');

  cy.intercept('GET', '/api/auth/user', {
    fixture: 'user.json'
  }).as('fetchUser');

  cy.setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  cy.visit('http://localhost:4000');
  cy.wait('@fetchIngredients');
  cy.wait('@fetchUser');
});

describe('E2E тесты конструктора бургера', () => {
  describe('Конструктор бургера работает', () => {
    it('Ингредиент добавляется', () => {
      cy.get(ingredient).find('button').click();
      cy.get(burgerIngredients).contains(
        'Мясо бессмертных моллюсков Protostomia'
      );
    });

    it('Булочки добавляются', () => {
      cy.get(bun).find('button').click();
      cy.get(burgerConstructor).contains('Краторная булка N-200i');
    });

    it('Соус добавляется', () => {
      cy.get(sauce).find('button').click();
      cy.get(burgerIngredients).contains(
        'Соус с шипами Антарианского плоскоходца'
      );
    });
  });

  describe('Модальное окно ингредиента работает', () => {
    beforeEach(() => {
      cy.get(ingredient).find(ingredientLink).click();
    });

    it('Модальное окно открывается', () => {
      cy.get(modalContent)
        .should('be.visible')
        .contains('Мясо бессмертных моллюсков Protostomia');
    });
    it('Модальное окно закрывается по клику на крестик', () => {
      cy.get(modalCloseBtn).click();
      cy.get(modalContent).should('not.exist');
    });
    it('Модальное окна закрывается по клику на оверлей', () => {
      cy.get(modalOverlay).click({ force: true });
      cy.get(modalContent).should('not.exist');
    });
  });

  describe('Сценарий использования конструктора работает', () => {
    it('Пользователь авторизуется', () => {
      cy.get(profile).should('be.visible').contains('aydlioh');
    });

    it('Заказ создается', () => {
      cy.get(profile).should('be.visible').contains('aydlioh');
      cy.get(ingredient).find('button').click();
      cy.get(bun).find('button').click();
      cy.get(sauce).find('button').click();

      cy.get(submitBtn).find('button').click();
      cy.wait('@createOrder');

      const orderModal = cy.get(modalContent);
      orderModal.should('be.visible').contains('63472');
      cy.get(modalCloseBtn).click();
      orderModal.should('not.exist');

      cy.get(burgerConstructor).contains('Выберите булки');
      cy.get(burgerIngredients).contains('Выберите начинку');
    });
  });
});
