const { defineConfig } = require("cypress");
const siteIpAddress = {DATABASEENDPOINT}

module.exports = defineConfig({
  env: {
  siteIpAddress: siteIpAddress,
  wordpressUserId: '{WORDPRESSUSERID}',
  wordpressPassword: '{WORDPRESSPASSWORD}',

  databaseName: '{DATABASENAME}',
  databaseUserId: '{DATABASEUSERID}',
  databasePassword: '{DATABASEPASSWORD}'
},
  e2e: {
    baseUrl: 'http://'+siteIpAddress,
	specPattern: '\\demo\\initialize_wp_db\\cypress\\**\\*.cy.js',
    supportFile: false,
    setupNodeEvents(on, config) {
    }
  }
})