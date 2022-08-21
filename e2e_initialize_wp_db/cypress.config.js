const { defineConfig } = require("cypress");
const siteIpAddress = '192.168.2.102'

module.exports = defineConfig({
  env: {
  siteIpAddress: siteIpAddress,
  wordpressUserId: 'TestUser',
  wordpressPassword: 'C1nder3llaInW0rdpre$$!',

  databaseName: 'wordpress',
  databaseUserId: 'root',
  databasePassword: 'C1nder3llaInW0rdpre$$!'
},
  e2e: {
    baseUrl: 'http://'+siteIpAddress,
	specPattern: '\\demo\\initialize_wp_db\\cypress\\**\\*.cy.js',
    supportFile: false,
    setupNodeEvents(on, config) {
    }
  }
})