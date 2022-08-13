const { defineConfig } = require("cypress");
const siteIpAddress = '192.168.2.28'

module.exports = defineConfig({
  env: {
	siteIpAddress: siteIpAddress,
  userId: 'TestUser',
  password: 'C1nder3llaInW0rdpre$$!',
  databaseName: 'wordpress'
},
  e2e: {
    baseUrl: 'http://'+siteIpAddress,
	specPattern: '\\demo\\initialize_wp_db\\cypress\\**\\*.cy.js',
    supportFile: false,
    setupNodeEvents(on, config) {
    }
  }
})