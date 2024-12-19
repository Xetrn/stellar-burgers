// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const selectors = {
  constructor: `[data-testId='burger-constructor']`,
  modalContainer: `[data-testId='modal-container']`,
  modalOverlay: `[data-testId='modal-overlay']`,
  ingredientsList: `[data-testId='ingredients-list']`,
  profileName: `[data-testId='profile-name']`,
  profileEmail: `[data-testId='profile-email']`,
};
