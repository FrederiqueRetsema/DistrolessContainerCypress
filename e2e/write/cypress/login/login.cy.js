// Check checkbox Remember Me doesn't work (yet) from within Cypress.

describe('Login', () => {
  it('Check Username And Password Without Remember Me', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)

    cy.get('input#user_login.input')
      .type(Cypress.env('userId'))
      .should('have.value', Cypress.env('userId'))  
    
    cy.get('input#user_pass.input.password-input')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))  
    
    cy.contains('Log In')
      .click()
	cy.url()
	  .should('include', '/wp-admin')
	cy.contains('Howdy, TestUser')

	cy.contains('Log Out')
	  .click({force: true})
	cy.url()
	  .should('not.include', '/wp-admin')
	cy.wait(1500)

    cy.get('input#user_login.input')
      .should('have.value', '')  
    
    cy.get('input#user_pass.input.password-input')
      .should('have.value', '')  
  })  

  it.skip('Check checkbox Remember Me', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)

    cy.get('input#user_login.input')
      .type(Cypress.env('userId'))
      .should('have.value', Cypress.env('userId'))  
    
    cy.get('input#user_pass.input.password-input')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))  

	cy.contains('Remember Me')
    cy.get('input#rememberme')
	  .click()
    
    cy.contains('Log In')
      .click()
	cy.url()
	  .should('include', '/wp-admin')
	cy.contains('Howdy, TestUser')
	
	cy.contains('Log Out')
	  .click({force: true})
	cy.url()
	  .should('not.include', '/wp-admin')
	cy.wait(1500)

    // When Cypress clicks in the field login name, the user-id is not visible. 
	// When done manually, it is visible.
    cy.get('input#user_login.input')
      .click()
	cy.contains(Cypress.env('userId'))
	cy.contains("********")
    
  })  

  it('Link Go to Test Blog', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)

	cy.contains('Go to Test Blog')
	  .click()
	cy.url()
	  .should('not.include', '/wp-admin')
  })
})
