describe.skip('Quick Draft window', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it.skip('Test title box', () => {
    cy.visit('/wp-admin/')
	cy.get('input#title')
	  .type('Demo')
	  .should('have.value', 'Demo')
  })
  
  it('Test content', () => {
    cy.visit('/wp-admin/')
  })

  it('Click the button', () => {
    cy.visit('/wp-admin/')
	
	cy.contains('Save Draft')
	  .click()
  })	
})