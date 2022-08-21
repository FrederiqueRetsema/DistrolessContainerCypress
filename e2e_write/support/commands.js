// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', () => { 
  cy.session("write", () => {
    cy.visit('/wp-admin');
    cy.wait(1500);
    cy.get('input#user_login.input').type(Cypress.env('wordpressUserId'));
    cy.get('input#user_pass.input.password-input').type(Cypress.env('wordpressPassword'));
    cy.contains('Log In')
      .click();
    cy.url().should('contain', '/wp-admin');
  })
})

Cypress.Commands.add('logout', () => { 
	cy.contains('Log Out')
	  .click({force: true});
	cy.url()
	  .should('not.include', '/wp-admin');
})
