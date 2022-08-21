const content = `#!/bin/bash
echo "This is a test - line 2(3)"
echo "This is a test - line 3(4)"

# This is a url: http://example.com
`;

describe('Syntax highlighter code', () => {
  beforeEach(() => {
    cy.login();

	cy.task('delete_posts');
    cy.visit('/wp-admin/post-new.php');
	// Skip welcome
	cy.focused({force:true})
	  .click();
  });
  
  it('Check textbox', () => {	 
    cy.get('[aria-label="Add title"]')
      .type('MyTitle');
	cy.contains('MyTitle');

    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Browse all')
	  .click();
	cy.contains('SyntaxHighlighter Code')
	  .click();
	  
    cy.get('[aria-label="Block: SyntaxHighlighter Code"]')
	  .within(() => {
 	    cy.get('[aria-label="SyntaxHighlighter Code"]')
	      .type(content)
	      .should('have.value', content);
	  });
	  
	cy.get('[aria-label="Settings"]')
	  .click();

    // Toggle line numbers (twice - should be on)
	cy.get('input#inspector-toggle-control-0')
	  .click()
	  .click();
	// Check type
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('select#inspector-select-control-2')
		    .select('BASH / Shell');
	  });
	cy.get('div.block-editor-block-contextual-toolbar')
	  .within(() => {
		  cy.contains('BASH / Shell');
	  });

    // First line number
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('input#inspector-text-control-2')
		    .clear()
		    .type('2')
			.should('have.value', '2');
	  });

    // Highlight
	cy.get('div.block-editor-block-inspector')
	  .within(() => {
		  cy.get('input#inspector-text-control-1')
		    .type('3')
			.should('have.value', '3');
	  });
	  
	// Toggle make clickable (twice - should be on)
	cy.get('input#inspector-toggle-control-1')
	  .click()
	  .click();
	  
	// Toggle Enable edit mode on double click (should be off)
	cy.get('input#inspector-toggle-control-2')
	  .click();
	  
	// Publish
	cy.contains('Publish')
	  .click();

    cy.get('div.editor-post-publish-panel__header')
	  .within(() => {
	    cy.contains('Publish')
	      .click();
	  });
	  
	cy.contains('View Post')
	  .click();
	cy.logout();
	
	// Check results
	cy.visit('/uncategorized/mytitle/');
    cy.contains('#!/bin/bash');
	cy.get('div.line.number3.index1.alt2.highlighted');
    cy.contains('This is a test - line 2(3)');
    cy.contains('This is a test - line 3(4)');
	cy.contains('6'); // line number
	cy.contains('example.com')
	  .should('have.attr', 'href', 'http://example.com');
  });
});
