// Upload image: possible to check if upload succeeded? (both from local file system and from URL)

describe('read blog', () => {
  beforeEach(() => {
    cy.login()
  })
  
  it('Init test', () => {
    cy.task('delete_posts')
    cy.task('delete_categories')
    cy.visit('/wp-admin/post-new.php')
	// Skip welcome
	cy.focused({force:true})
	  .click()
	  
    cy.get('[aria-label="Add title"]')
      .type("Read test")

    cy.get('[aria-label="Add block"]')
      .click()
	cy.contains("Heading")
	  .click()
	cy.get('[aria-label="Block: Heading"]')
	  .type("MyHeading{enter}", {force:true})

	cy.get('[data-title="Paragraph"]')
	  .type('MyText{enter}')

	cy.get('[data-title="Paragraph"]')
	  .last()
	  .type(' ')
	cy.get('[aria-label="Tools"]')
	  .click()
	cy.get('div.components-popover__content',{force:true})
	  .invoke('show')
	  .last()
      .trigger('mousemove')
    cy.get('[aria-label="Bold"]')
	  .click({force:true})

	cy.get('[data-title="Paragraph"]')
	  .last()
	  .type('MyBoldText{enter}', {force:true})

	cy.get('[data-title="Paragraph"]')
	  .last()
	  .type(' ', {force:true})
	cy.get('[aria-label="Tools"]')
	  .click()
	cy.get('div.components-popover__content',{force:true})
	  .invoke('show')
	  .last()
      .trigger('mousemove')
    cy.get('[aria-label="Italic"]')
	  .click({force:true})

	cy.get('[data-title="Paragraph"]')
	  .last()
	  .type('MyItalicText{enter}', {force:true})
	cy.get('em')

    cy.get('[aria-label="Toggle block inserter"]')
      .click({force:true})
	cy.contains('Image')
	  .click()
	  
  	cy.get('button.components-button.block-editor-media-placeholder__button.block-editor-media-placeholder__upload-button.is-primary')
	  .within(() => {
	  
		cy.contains("Upload")
	      .click({force:true})
	  })
	  
	// Downloaded from: https://s.w.org/style/images/about/WordPress-logotype-standard.png
	cy.get('[data-testid="form-file-upload-input"]')
	  .selectFile('cypress\\fixtures\\WordPress-logotype-standard.png', {force:true})  

	cy.get('[aria-label="Image caption text"]')
	  .type("WordPressCaptionText{enter}")

    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
  	    cy.contains("List")
	      .click({force:true})
    })
	  
	// List (unordered)
	cy.get('[aria-label="Block: List"]')
	  .type("MyList (unordered){enter}", {force:true})

    // List (ordered)
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
  	    cy.contains("List")
	      .click({force:true})
    })
	  
	cy.get('[aria-label="Tools"]')
	  .click()
	cy.get('[aria-label="Block: List"]',{force:true})
	  .last()
	  .click({force:true})
	cy.get('[aria-label="Ordered"]')
	  .click()

	cy.get('[aria-label="Block: List"]')
	  .last()
	  .clear({force:true})
	  .type("MyList (ordered)",{force:true})

    // Quote
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
  	    cy.contains("Quote")
	      .click({force:true})
	  })
	cy.get('[aria-label="Quote text"]')
	  .type("MyQuote", {force:true})

	cy.get('[aria-label="Quote citation text"]')
	  .type("Quote citation", {force:true})

	cy.get('[aria-label="Tools"]')
	  .click()
	cy.get('[aria-label="Quote citation text"]',{force:true})
	  .invoke('show')
      .trigger('mousemove', {force:true})
    cy.get('[aria-label="Bold"]')
	  .click({force:true})

	cy.get('[aria-label="Quote citation text"]')
	  .type('Bold')

    // Code
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
	    cy.contains("Code")
	      .click({force:true})
	  })

    cy.get('[aria-label="Block: Code"]')	
	  .type('10 print "Cypress"{enter}20 goto 10')
	cy.contains('10 print "Cypress')

    // Pullquote
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
	    cy.contains("Pullquote")
	      .click({force:true})
	  })

    cy.get('[aria-label="Pullquote text"]')	
	  .type('MyPullQuote')

    cy.get('[aria-label="Pullquote citation text"]')	
	  .type('MyPullCitation')

    // Table
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
	    cy.contains("Table")
	      .click({force:true})
	  })
	  
	// make 3 x 4 instead of 2 x 2
	cy.get('input#inspector-text-control-0.components-text-control__input')
	  .clear()
	  .type(3, {force:true})
	  .should('have.value', 3)

	cy.get('input#inspector-text-control-1.components-text-control__input')
	  .clear()
	  .type(4, {force:true})
	  .should('have.value', 4)
	
	cy.contains("Create Table")
	  .click()

    cy.get('[aria-label="Body cell text"]')	
	  .first()
	  .type('Cell Text')

    // SyntaxHighlighter Code
    cy.get('[aria-label="Toggle block inserter"]')
      .click()
	cy.get('div.block-editor-inserter__panel-content')
	  .within(() => {
	    cy.contains("SyntaxHighlighter Code")
	      .click({force:true})
	  })
	  
    cy.get('[aria-label="Block: SyntaxHighlighter Code"]')
	  .within(() => {
 	    cy.get('[aria-label="SyntaxHighlighter Code"]')
	      .type('#!/bin/bash\necho "Hello World"\nread input\n\n# Example from http://example.com')
	  })
	  
	cy.get('[aria-label="Settings"]')
	  .click()

    // Toggle line numbers (twice - should be on)
	cy.get('input#inspector-toggle-control-0')
	  .click()
	  .click()

    // Color Syntax Code
	// Check type
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('select#inspector-select-control-2')
		    .select('BASH / Shell')
	  })
	cy.get('div.block-editor-block-contextual-toolbar')
	  .within(() => {
		  cy.contains('BASH / Shell')
	  })

    // First line number
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('input#inspector-text-control-4')
		    .clear()
		    .type('2')
			.should('have.value', '2')
	  })

    // Highlight
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('input#inspector-text-control-3')
		    .type('3')
			.should('have.value', '3')
	  })
	  
	// Toggle make clickable (twice - should be on)
	cy.get('input#inspector-toggle-control-1')
	  .click()
	  .click()
	  
	// Toggle Enable edit mode on double click (should be off)
	cy.get('input#inspector-toggle-control-2')
	  .click()

    cy.get('[aria-label="Toggle block inserter"]', {force:true})
      .click()
	cy.contains("More")
	  .click()
	cy.get('div.is-root-container')
	  .click({force:true})

    // Change category
	cy.get('[aria-label="Settings"]')
	  .click()
	cy.get('[data-label="Post"]')
	  .click({force:true})
	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Categories')
		    .click({force:true})
	  })
    cy.contains('Add New Category')
	  .click({force:true})
	cy.get('input#inspector-text-control-5.components-text-control__input')
	  .type('MyNewCategory{enter}')

    // Tag
	cy.get('button.components-button.components-panel__body-toggle')
	  .within(() => {
		  cy.contains('Tags')
		    .click({force:true})
	  })
	cy.get('div.components-form-token-field')
      .type('MyNewTag{enter}')
	
	// Publish
	cy.contains("Publish")
	  .click()
	cy.wait(500)

    cy.get('div.editor-post-publish-panel__header')
	  .within(() => {
	    cy.contains("Publish")
	      .click()
		cy.wait(500)
	  })
	  
	cy.contains('View Post')
	  .click()
	cy.logout()
	
  })
  
  it ('Check posted blog', () => {

    cy.visit('/uncategorized/read-test/')
	
    cy.contains('Read test')
    cy.contains('MyHeading')
    cy.contains('MyText')
	cy.contains('MyBoldText')
	cy.get('strong')
	cy.contains('MyItalicText')
	cy.get('em')
	cy.contains('WordPressCaptionText')
	cy.contains('MyList (unordered)')
	cy.contains('MyList (ordered)')
	cy.contains('MyQuote')
	cy.contains('Quote citation')
	cy.contains('Cell Text')
	cy.contains('MyPullQuote')
	cy.contains('MyPullCitation')

	// Syntax Highlight Code
    cy.contains('#!/bin/bash')
	cy.get('div.line.number3.index1.alt2.highlighted')
    cy.contains('echo "Hello World"')
    cy.contains('read input')
	cy.contains('6') // line number
	cy.contains('example.com')
	  .should('have.attr', 'href', 'http://example.com')

  })

  it ('Check main site', () => {
    cy.visit('/')
    cy.contains('Read test')
      .click()
	cy.contains('http://example.com')
	  .should('have.attr', 'href', 'http://example.com')
  })

  it ('Check category site', () => {
    cy.visit('/mynewcategory')
    cy.contains('Read test')
      .click()
	cy.contains('http://example.com')
	  .should('have.attr', 'href', 'http://example.com')
  })

  it ('Check tag', () => {
    cy.visit('/tag/mynewtag')
    cy.contains('Read test')
      .click()
	cy.contains('http://example.com')
	  .should('have.attr', 'href', 'http://example.com')
  })
})

