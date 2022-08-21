describe('write blog', () => {
  beforeEach(() => {
    cy.login();
 
	cy.visit('/wp-admin/post-new.php');
	// Skip welcome
	cy.focused({force:true})
	  .click();
	  
  });
  
  it('Title', () => {
    cy.get('[aria-label="Add title"]')
      .type('MyTitle')
	cy.contains('MyTitle');
  });
  
  it('Add heading h2', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Heading')
	  .click();
	cy.get('[aria-label="Block: Heading"]')
	  .type('MyHeading h2', {force:true});
	cy.contains('MyHeading h2');
	cy.get('h2');
  })
  
  it('Add heading h3', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Heading')
	  .click();
	cy.get('[aria-label="Change heading level"]')
	  .click();
	cy.get('[aria-label="Heading 3"]')
	  .click()
	  
	cy.get('[aria-label="Block: Heading"]')
	  .type('MyHeading h3', {force:true});
	cy.contains('MyHeading h3');
	cy.get('h3');
  })
  
  it('Add normal text', () => {
	cy.get('[aria-label="Add default block"]')
	  .type('MyText');
	cy.contains('MyText');
  });

  it('Add bold text', () => {
	cy.get('[aria-label="Add default block"]')
	  .type(' ');
	cy.get('[aria-label="Tools"]')
	  .click();
	cy.get('div.components-popover__content',{force:true})
	  .invoke('show')
      .trigger('mousemove');
    cy.get('[aria-label="Bold"]')
	  .click({force:true});

	cy.get('[aria-label="Paragraph block"]')
	  .type('MyBoldText', {force:true});
	cy.contains('MyBoldText');
	cy.get('b');
  });

  it('Add italic text', () => {
	cy.get('[aria-label="Add default block"]')
	  .type(' ');
	cy.get('[aria-label="Tools"]')
	  .click();
	cy.get('div.components-popover__content',{force:true})
	  .invoke('show')
      .trigger('mousemove');
    cy.get('[aria-label="Italic"]')
	  .click({force:true});

	cy.get('[aria-label="Paragraph block"]')
	  .type('MyItalicText', {force:true});
	cy.contains('MyItalicText');
	cy.get('em');
  });

  it('Add image (from local file)', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Image')
	  .click();
	  
  	cy.get('button.components-button.block-editor-media-placeholder__button.block-editor-media-placeholder__upload-button.is-primary')
	  .within(() => {
	  
		cy.contains('Upload')
	      .click({force:true});
	  });
	  
	// Downloaded from: https://s.w.org/style/images/about/WordPress-logotype-standard.png
	cy.get('[data-testid="form-file-upload-input"]')
	  .selectFile('cypress\\fixtures\\WordPress-logotype-standard.png', {force:true});

	cy.get('[aria-label="Image caption text"]')
	  .type('WordPress{enter}');
  });

  it('Add image (incl. block)', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Image')
	  .click();
	  
    cy.contains('Insert from URL')
	  .click();
	cy.get('[aria-label="URL"]')
	  .type('https://www.pronamic.nl/wp-content/uploads/2019/10/Featured-image-WordPress.svg{enter}');
	cy.get('[aria-label="Image caption text"]')
	  .type('WordPress logo caption text{enter}');
	cy.contains('WordPress logo caption text');
	
	cy.get('[aria-label="Block: Image"]')
	  .click();

    // Caption in submenu	
	cy.get('[id="inspector-textarea-control-1"]')
	  .type('Caption-in-submenu')
	  .should('have.value', 'Caption-in-submenu');
	
 	// Size X 1540 -> 154
  	cy.get('[id="inspector-text-control-2"]')
	  .clear()
	  .type('154')
	  .should('have.value', '154');

 	// Size Y 800 -> 80
	cy.get('[id="inspector-text-control-3"]')
	  .clear()
	  .type('80')
	  .should('have.value', '80');

    // Button 25%	  
	cy.contains('25%')
	  .click()
	  .then(()=>{
 	     cy.get('[id="inspector-text-control-3"]')
	       .should('have.value', '200');
	   });

    // Button 50%	  
	cy.contains('50%')
	  .click()
 	  .then(() => {
 	     cy.get('[id="inspector-text-control-3"]')
	       .should('have.value', '400');
      });

    // Button 75%	  
	cy.contains('75%')
	  .click()
	  .then(() => {
 	    cy.get('[id="inspector-text-control-3"]')
	      .should('have.value', '600');
   	  });

    // Button 100%	  
	cy.contains('100%')
	  .click()
      .then(() => {
        cy.get('[id="inspector-text-control-3"]')
	      .should('have.value', '800');
	  });

    // Radius
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('20{enter}');
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('40{enter}');
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('100{enter}');
	cy.get('[aria-label="Border radius"]')
	  .clear()
	  .type('1000{enter}');	
  });

  it('Add List', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.get('[aria-label="Blocks"]')
	  .within(() => {
  	    cy.contains('List')
	      .click({force:true});
    });
	  
	// List (unordered)
	cy.get('[aria-label="Block: List"]')
	  .type('MyList (unordered)', {force:true});
	cy.contains('MyList (unordered)');
	cy.get('ul');
	cy.contains('(unordered)');
	
	// List (ordered)
	cy.get('[aria-label="Tools"]')
	  .click();
	cy.get('[aria-label="Block: List"]',{force:true})
	  .click({force:true});
	cy.get('[aria-label="Ordered"]')
	  .click();

	cy.get('[aria-label="Block: List"]')
	  .clear({force:true})
	  .type('MyList (ordered)',{force:true});
	cy.get('ol');
	cy.contains('(ordered)');

    // Make bold
	cy.get('[aria-label="Tools"]')
	  .click();
	cy.get('[aria-label="Block: List"]',{force:true})
	  .click({force:true});
    cy.get('[aria-label="Bold"]')
	  .click({force:true});

	cy.get('[aria-label="Block: List"]')
	  .type('Bold',{force:true});
	cy.contains('Bold');
	cy.get('b');
  });

  it('Add Quote', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Quote')
	  .click();
	  
	// Quote
	cy.get('[aria-label="Quote text"]')
	  .type('MyQuote', {force:true});
	cy.contains('MyQuote');

	// Citation
	cy.get('[aria-label="Quote citation text"]')
	  .type('Quote citation');
	cy.contains('Quote citation');

    // Make bold
	cy.get('[aria-label="Tools"]')
	  .click();
	cy.get('[aria-label="Quote citation text"]',{force:true})
	  .invoke('show')
      .trigger('mousemove', {force:true});
    cy.get('[aria-label="Bold"]')
	  .click({force:true});

	cy.get('[aria-label="Quote citation text"]')
	  .type('Bold');
	cy.contains('Bold');
	cy.get('b');
  });
});

describe('Browse All', () => {
  beforeEach(() => {
    cy.login();

    cy.visit('/wp-admin/post-new.php');
	// Skip welcome
	cy.focused({force:true})
	  .click();
  })

  it('Add Code', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Browse all')
	  .click();
	cy.contains('Code')
	  .click();

    cy.get('[aria-label="Block: Code"]')	
	  .type('10 print "Cypress"{enter}20 goto 10');
	cy.contains('10 print "Cypress');
  });

  it('Add Pullquote', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Browse all')
	  .click();
	cy.contains('Pullquote')
	  .click();

    cy.get('[aria-label="Pullquote text"]')	
	  .type('MyQuote');
	cy.contains('MyQuote');

    cy.get('[aria-label="Pullquote citation text"]')	
	  .type('MyCitation');
	cy.contains('MyCitation');
  })

  it('Add Table', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Browse all')
	  .click();
	cy.contains('Table')
	  .click();
	  
	// make 3 x 4 instead of 2 x 2
	cy.get('input#inspector-text-control-0.components-text-control__input')
	  .clear()
	  .type(3, {force:true})
	  .should('have.value', 3);

	cy.get('input#inspector-text-control-1.components-text-control__input')
	  .clear()
	  .type(4, {force:true})
	  .should('have.value', 4);
	
	cy.contains('Create Table')
	  .click();

    cy.get('[aria-label="Body cell text"]')	
	  .first()
	  .type('Cell Text');
	cy.contains('Cell Text');
  });

  it('Add More', () => {
    cy.get('[aria-label="Add block"]')
      .click();
	cy.contains('Browse all')
	  .click();
	cy.contains('More')
	  .click();
	  
	cy.get('[aria-label="Block: More"]')
  });
});

