import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    BURGER_API_URL: 'https://norma.nomoreparties.space/api'
  },
  e2e: {
    viewportWidth: 1024,
    viewportHeight: 768,
    video: false,
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
