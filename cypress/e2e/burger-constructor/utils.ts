export const addItem = (itemName: string) => {
  cy.get(`[data-cy='${itemName}']`).should('exist').as('item');
  cy.get('@item').find('button').first().should('exist').click();
};
export const isConstructorEmpty = () => {
  cy.get(`[data-cy='middle']`).contains('Выберите начинку');
  cy.get(`[data-cy='top']`).contains('Выберите булки');
  cy.get(`[data-cy='bottom']`).contains('Выберите булки');
};
