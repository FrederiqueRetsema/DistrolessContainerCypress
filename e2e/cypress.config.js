// cypress.config.js
// =================

const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://{LOCALHOST}:8080',
        specPattern: '/e2e/cypress/**/*.cy.js',
        supportFile: false,
        setupNodeEvents(on, config) {}
    }
})