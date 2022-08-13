// Check open/close "Screen Options"

describe('Check Updates screen', () => {
  beforeEach(() => {
    cy.login()
  });

  it('Check Updates', () => {
    cy.visit('/wp-admin/update-core.php')

	cy.contains('Current version')
	cy.contains('Check again')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/update-core.php?force-check=1')
  })
  
  it('Other tests', () => {
    cy.visit('/wp-admin/update-core.php')

	//to be written

  });
  
})
