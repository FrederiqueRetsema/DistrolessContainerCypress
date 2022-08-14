describe('Select Language', () => {
  it('Select language', () => {
    cy.visit('/')

    cy.contains('Continue')
      .click()

	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=0')
  })
});

describe('Let’s go!', () => {
 
  it('Let’s go!', () => {

    cy.contains('Let’s go!')
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=1')
    cy.wait(1500)
  })
})

describe('Set database settings', () => {
  it('Input database name', () => {

    cy.get('input#dbname')
	  .clear()
      .type(Cypress.env('databaseName'))
      .should('have.value', Cypress.env('databaseName'))  
  });

  it('Input user name', () => {
    cy.get('input#uname')
	  .clear()
      .type('root')
      .should('have.value', 'root')  
  });

  it('Input password', () => {
    cy.get('input#pwd')
	  .clear()
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))  
  });

  it('Input database host', () => {
    cy.get('input#dbhost')
	  .clear()
      .type(Cypress.env('siteIpAddress'))
      .should('have.value', Cypress.env('siteIpAddress'))  
  });
  
  it('Input prefix', () => {
    cy.get('input#prefix')
	  .clear()
      .type('wp_')
      .should('have.value', 'wp_')  
  });	
  
  it('Push submit', () => {
    cy.contains('Submit')
      .click()
	cy.url()
	  .should('include', '/wp-admin/setup-config.php?step=2')
  })
});


describe('Run the installation', () => {
  it('Run the installation', () => {
	cy.screenshot()
    cy.contains('Run the installation')
      .click()
	cy.url()
	  .should('include', '/wp-admin/install.php?language=en_US')
    cy.wait(1500)
  })
});

describe('Set blog site settings', () => {
  it('Set title', () => {
    cy.get('input#weblog_title')
      .type('Test Blog')
      .should('have.value', 'Test Blog')  
  });
  
  it('Set user login name', () => {
    cy.get('input#user_login')
      .type(Cypress.env('userId'))
      .should('have.value', Cypress.env('userId'))
  });
  
  it('Set user login password', () => {
    cy.get('input#pass1.regular-text.strong')
      .clear()
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'))
  });

  it('Set email', () => {
    cy.get('input#admin_email')
      .type('test@example.com')
      .should('have.value', 'test@example.com')
  });
  
  it('No public blog', () => {
    cy.get('input#blog_public')
      .click()
  });
  
  it('Click on Install WordPress', () => {
    cy.contains('Install WordPress')
      .click()
  });

  it ('Click on Log In', () => {
    cy.contains('Log In')
      .click()
	cy.url()
	  .should('include', '/wp-login.php')
  })
})

describe('Remove plugins', () => {

  it('Remove plugins', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()
    cy.url().should('contain', '/wp-admin')

	cy.contains('Plugins')
	  .click()

    // Select all plugins	  
	cy.get('input#cb-select-all-1')
	  .click()
	  
	// Delete all plugins
    cy.get('select#bulk-action-selector-top')
      .select('Delete')	
	cy.get('input#doaction.button.action')
	  .click({force: true})
	cy.wait(2000)
  })
  
  
})

describe('Add plugins yoast and color syntax code ', () => {

  it('Add yoast', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()
    cy.url().should('contain', '/wp-admin')


	cy.contains('Plugins')
	  .click()
	
	cy.get('div.wrap')
	  .within(() => {
	     cy.contains('Add New')
		   .click()
	  })
	cy.get('[aria-describedby="live-search-desc"]')
	  .type('Yoast SEO{enter}')
	cy.get('[data-slug="wordpress-seo"]')
	  .click()
	cy.wait(4000)
	cy.get('[aria-label="Activate Yoast SEO"]')
	  .click()
  })

  it('Add SyntaxHighlighter Evolved', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()

	cy.contains('Plugins')
	  .click()
	
	cy.get('div.wrap')
	  .within(() => {
	     cy.contains('Add New')
		   .click()
	  })
	cy.get('[aria-describedby="live-search-desc"]')
	  .type('SyntaxHighlighter Evolved{enter}')
	cy.get('[data-slug="syntaxhighlighter"]')
	  .click()
	cy.wait(4000)
	cy.get('[aria-label="Activate SyntaxHighlighter Evolved"]')
	  .click()
  })
    
})

describe('Configure Yoast for the first time', () => {

  it('Configure yoast', () => {
    cy.visit('/wp-admin')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()
	
	cy.contains('Yoast SEO First-time configuration')
	  .click()
  cy.wait(1000)

  cy.contains('Continue')
	  .click()
	cy.get('span.yst-block.yst-truncate')
	  .click()
	cy.get('[aria-labelledby="headlessui-listbox-label-3"]')
	  .within(() => {
	    cy.contains('Person')
	      .click({force:true})
	  })
	  
	// Select first user in the list (TestUser)
	cy.get('[aria-labelledby="headlessui-combobox-label-9"]')
	  .click()
	cy.get('li#headlessui-combobox-option-13')
	  .click({force:true})
	  
	cy.contains('Save and continue')
	  .click()
	// Ignore message that we should also upload an image
	cy.contains('Save and continue')
	  .click()
  

  // Ignore all social media and click Save and continue
  cy.get('div#content-2')
    .within(() => {
  	  cy.contains('Save and continue')
	      .click({force:true})
      cy.wait(1500)
    })

  // No tracking or newsletter
  cy.get('div#content-3')
    .within(() => {
  	  cy.contains('Save and continue')
	      .click({force:true})
      cy.wait(1500)
    })
  
  // Don't show results in SEO search results
  cy.visit('/wp-admin')
  cy.contains("I don't want this site to show in the search results.")
    .click()
  })

})

describe('Configure permalinks', () => {
  it('Set permalinks', () => {
	cy.visit('/wp-admin/options-permalink.php')
	cy.wait(1500)
    cy.get('input#user_login.input').type(Cypress.env('userId'))
    cy.get('input#user_pass.input.password-input').type(Cypress.env('password'))
    cy.contains('Log In').click()
	
	cy.get('input#custom_selection')
	  .click()
	cy.get('input#permalink_structure')
	  .clear()
	  .type('/%category%/%postname%/')
	  
	cy.get('form')
	  .within(() => {
  	    cy.contains('Save Changes')
	      .click({force:true})
	  })
  })

})

