// cypress.config.js
// =================

const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: '{LOCALHOST}:8080',
        supportFile: false,
        setupNodeEvents(on, config) {}
    }
})