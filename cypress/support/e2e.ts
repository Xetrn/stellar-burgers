declare namespace Cypress {
  interface Chainable {
    /**
     * Сохраняет токен в localStorage
     * @param key - Ключ
     * @param value - Значение
     */
    setToken(key: string, value: string): void;
  }
}

Cypress.Commands.add('setToken', (key, value) => {
  window.localStorage.setItem(key, value);
});
