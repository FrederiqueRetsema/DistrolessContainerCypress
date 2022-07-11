// start-site.cy.js
// ================

describe('Start site', () => {
    it('Start site', () => {
        cy.visit('/')
          .contains('Hello Distroless')
    })
})