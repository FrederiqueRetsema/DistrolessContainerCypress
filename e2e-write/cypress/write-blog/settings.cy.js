
describe('Settings (right side of screen)', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it('Publish immediately or on a certain time', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
	
	cy.get('button.components-button.edit-post-post-schedule__toggle')
	  .click()
    cy.get('table.CalendarMonth_table.CalendarMonth_table_1')
	  .within(() => {
		  cy.contains('3')
		    .click({force:true})
	  })
  })

  it('Improve with Yoast SEO', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
  
	cy.contains('Improve your post with Yoast SEO')
	  .click({force:true})
	cy.get('[aria-label="Settings"]')
	  .click()
  })
	  
  it('Permalink', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Permalink')
  	        .click({force:true})
	  })
  })
  
  it('Categories', () => {
    cy.task('delete_categories')
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

    cy.get('[aria-label="Add title"]')
      .type("MyTitle")

	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Categories')
		    .click({force:true})
	  })
    cy.contains('Add New Category')
	  .click({force:true})
	cy.get('input#inspector-text-control-0.components-text-control__input')
	  .type('MyNewCategory')
	  .should('have.value', 'MyNewCategory')
	cy.get('select#inspector-select-control-1')
	  .select('Uncategorized')
	cy.wait(100)
	cy.get('button.components-button.editor-post-taxonomies__hierarchical-terms-submit.is-secondary')
	  .click()
	cy.contains('MyNewCategory')
  })
  
  it('Tags', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
  
    cy.get('[aria-label="Add title"]')
      .type("MyTitle")

	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Tags')
		    .click({force:true})
	  })
	cy.get('div.components-form-token-field')
      .type('MyTag{enter}')
	cy.contains('MyTag')
  })


  it('Featured image', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
	  
    cy.get('[aria-label="Add title"]')
      .type("MyTitle")

	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Featured image')
		    .click({force:true})
	  })
	cy.get('div.components-drop-zone')
	  .selectFile('cypress\\fixtures\\WordPress-logotype-standard.png', {force:true, action: 'drag-drop', waitForAnimations: true})
	cy.contains('Set featured image')
	  .click({force:true})
	cy.wait(500)
	cy.contains("Remove featured image")
	 
  })

  it('Excerpt', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

    cy.get('[aria-label="Add title"]')
      .type("MyTitle")

 	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Excerpt')
		    .click({force:true})
	  })
	  
	cy.get('div.editor-post-excerpt')
	  .within(() => {
	    cy.get('textarea#inspector-textarea-control-0')
          .type('Excerpt')
	      .should('have.value', 'Excerpt')
	  })
  })

  it('Discussion', () => {
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Discussion')
		    .click({force:true})
	  })
  })

  it('Add new blog', () => {
    cy.task('delete_categories')
    cy.task('delete_posts')
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()

    // Add title	  
    cy.get('[aria-label="Add title"]')
      .type("MyTitle")

    // Add text
	cy.get('[aria-label="Add default block"]')
	  .type('MyText')

    // Part of a new category
	cy.get('div.interface-complementary-area.edit-post-sidebar')
	  .within(() => {
		cy.contains('Post')
		  .click()

  	    cy.get('button.components-button.components-panel__body-toggle')
	      .within(() => {
		      cy.contains('Categories')
		        .click({force:true})
  	      })
        cy.contains('Add New Category')
	      .click({force:true})
	    cy.get('input#inspector-text-control-0.components-text-control__input')
	      .type('Another New Category')
	    cy.get('button.components-button.editor-post-taxonomies__hierarchical-terms-submit.is-secondary')
	      .click()
		  	
        // Do featured image as last, it screws up the screen
		cy.get('button.components-button.components-panel__body-toggle')
		  .within(() => {
			  cy.contains('Featured image')
				.click({force:true})
		  })
		cy.get('div.components-drop-zone')
		  .selectFile('cypress\\fixtures\\WordPress-logotype-standard.png', {force:true, action: 'drag-drop', waitForAnimations: true})
		cy.contains('Set featured image')
		  .click({force:true})
		cy.wait(500)
		cy.contains("Remove featured image")
	  })
	
	cy.contains('Publish')
	  .click({force:true})
	cy.wait(1000)
	cy.get('div.editor-post-publish-panel')
	  .within(() => {
	    cy.contains('Publish')
	      .click({force:true})
	    cy.wait(1000)
	  })
	
	cy.contains('Publish')
	  .click({force:true})
	cy.wait(1000)
	
	// Check /category/another-new-categry
	cy.logout()
	cy.wait(2000)
	cy.visit('/category/another-new-category/')
	cy.contains('MyTitle')
	  .click()
	 
  })
    
})  

