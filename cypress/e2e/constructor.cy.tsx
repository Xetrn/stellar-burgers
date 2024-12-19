const ingredient = '[data-cy="ingredient-link-item"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const constructor = '[data-cy="constructor"]';
const orderButton = '[data-cy="getOrder-button"]';

describe('Burger constructor and order creation', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', `api/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', `api/orders`, {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('mockRefreshToken')
    );
    cy.setCookie('accessToken', JSON.stringify('mockAccessToken'));

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Constructor functionality', () => {
    it('should display ingredients in the constructor', () => {
        cy.get(ingredient, { timeout: 10000 }).should('exist');
        cy.get(ingredient).first().click();
        cy.get(constructor).as('constructor');
        cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('should open and close the ingredient modal', () => {
      cy.get(ingredient, { timeout: 10000 }).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy="close-button"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('should close ingredient modal when clicking overlay', () => {
      cy.get(ingredient, { timeout: 10000 }).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click({ force: true });
      cy.get('@modal').should('not.exist');
    });

    it('should create an order and display order number in modal', () => {
      cy.get(ingredient, { timeout: 10000 }).first().click();
      cy.get(ingredient).eq(1).click();
      cy.get(orderButton).click();

      cy.wait('@createOrder');

      cy.get(modal).as('orderModal');
      cy.get('@orderModal').should('exist');
      cy.get('@orderModal').should('contain', '555');

      cy.get(modalOverlay).click({ force: true });
      cy.get('@orderModal').should('not.exist');
    });
  });
});
