describe('Links on top', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Search bar', () => {
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('input#comment-search-input')
      .type('get started');
    cy.get('input#search-submit.button')
	    .click({force:true});
    cy.contains('wapuu@wordpress.example');
	  cy.get('[data-wp-lists="list:comment"]')
	    .find('tr')
	    .should('have.length', 2);
  });

  it('All', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('li.all')
      .within(() => {
        cy.contains('1');
	  });
  });

  it('Mine', () => {
	cy.task('remove_test_comments')
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('li.mine')
      .within(() => {
		  cy.contains('0');
	  });
  });


  it('Pending', () => {
	cy.task('remove_test_comments')
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('li.moderated')
      .within(() => {
		  cy.contains('0');
	  });
  });

  it('Approved', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // Click necessary because sometimes an old number is given because of the removal of previous comments
    cy.get('li.approved')
      .click();
    cy.get('li.approved')
      .within(() => {
		  cy.contains('1')		  
	  });
  });

  it('Spam', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // Click necessary because sometimes an old number is given because of the removal of previous comments
    cy.get('li.spam')
      .within(() => {
		  cy.contains('0');
	  });
  });

  it('Trash', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // Click necessary because sometimes an old number is given because of the removal of previous comments
    cy.get('li.trash')
      .within(() => {
       cy.contains('0');
	  });
  });
});

describe('Comments', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check if comment is visible', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
    });

    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
      })
    cy.contains('Hi, this is a comment');
    cy.get('li#comment-1')
      .should('exist');
  })

  it('Unapprove', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Unapprove')
          .click({force:true})
        cy.wait(1000);
    });

    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
      });
    cy.get('li#comment-1')
      .should('not.exist');
  });

  it('Approve (= Check if comment is visible, but then after Unapprove)', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
    });

    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
      });
    cy.contains('Hi, this is a comment')    
    cy.get('li#comment-1')
      .should('exist');
  })

  it('Reply', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true})
        cy.wait(1000);
    });

    // Create new reply before quick editing it
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("willBeQuickEdited", {force:true})
      .should('have.value', 'willBeQuickEdited');

    cy.get('span#replybtn')
      .click({force:true});

    // Enforce order for comments from Newest > Oldest
    cy.visit('/wp-admin/edit-comments.php');
    cy.wait(1000);

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true})
        cy.wait(1000)
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("myText", {force:true})
      .should('have.value', 'myText');

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
        cy.wait(1000);
      });
    cy.contains('myText');
    cy.get('li#comment-1')
      .should('exist');
  });

  it('Quick Edit', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    // Create new reply before quick editing it
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("willBeQuickEdited", {force:true})
      .should('have.value', 'willBeQuickEdited');

    cy.get('span#replybtn')
      .click({force:true});

    // Enforce order for comments from Newest > Oldest
    cy.visit('/wp-admin/edit-comments.php');
    cy.wait(1000);

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Quick Edit')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("myEditedText", {force:true});

    cy.get('span#savebtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true})
        cy.wait(1000)
      });
    cy.contains('myEditedText');
    cy.get('li#comment-1')
      .should('exist');
  })

  it('Edit', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    //First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    // Create new reply before editing it
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("willBeEdited", {force:true})
      .should('have.value', 'willBeEdited');

    cy.get('span#replybtn')
      .click({force:true});

    // Enforce order for comments from Newest > Oldest
    cy.visit('/wp-admin/edit-comments.php');
    cy.wait(1000);

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.get('[aria-label="Edit this comment"]')
          .first()
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('input#name')
      .clear({force:true})
      .type('NewName')
      .should('have.value', 'NewName');

    cy.get('input#email')
      .clear({force:true})
      .type('new-email@example.com')
      .should('have.value', 'new-email@example.com');

    cy.get('input#newcomment_author_url')
      .clear({force:true})
      .type('http://example.com')
      .should('have.value', 'http://example.com');

    cy.get('textarea#content.wp-editor-area')
      .clear({force:true})
      .type('New Comment')
      .should('have.value', 'New Comment');

    cy.get('[id="comment-status-radio"]')
      .within(() => { 
         cy.contains('Approved')
           .click();
        });
       
    cy.get('[id="comment-status-radio"]')
      .within(() => { 
          cy.contains('Pending')
            .click();
          });
       
    cy.get('[id="comment-status-radio"]')
      .within(() => { 
          cy.contains('Spam')
            .click();
          });
       
    cy.get('[id="comment-status-radio"]')
      .within(() => { 
         cy.contains('Approved')
           .click();
      });
           
    cy.get('input#save')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
        cy.wait(1000);
      });
    cy.contains('NewName')    
      .should('have.attr', 'href', 'http://example.com');
    cy.contains('New Comment');
    cy.get('li#comment-1')
      .should('exist');
  });
});

describe('Reply - buttons (except image and close tags)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Reply - bold', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

      cy.get('[data-colname="Comment"]')
        .within(() => {
          cy.contains('Reply')
            .click({force:true});
        });

      cy.get('[aria-label="Bold"]')
        .click({force:true});

      cy.get('textarea#replycontent.wp-editor-area')
        .type("myBoldText", {force:true});

      cy.get('[aria-label="Close bold tag"]')
        .click({force:true});

      cy.get('span#replybtn')
        .click({force:true});

      // Check if the reply is added
      cy.get('[data-colname="In response to"]')
        .within(() => {
          cy.contains('View Post')
            .click({force:true});
          cy.wait(1000);
        });
      cy.get('strong');
      cy.contains('myBoldText');
      cy.get('li#comment-1')
        .should('exist');
  });

  it('Reply - italic', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Italic"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myItalicText", {force:true});

    cy.get('[aria-label="Close italic tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('em');
    cy.contains('myItalicText');
    cy.get('li#comment-1')
      .should('exist');
  });

  it('Reply - link', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Insert link"]')
      .click({force:true});
    cy.wait(500);

    cy.get('[aria-describedby="wplink-enter-url"]')
      .type(Cypress.config().baseUrl, {force:true});
    cy.get('input#wp-link-text')
      .type('Homepage', {force:true});
    cy.contains('Open link in a new tab')
      .click({force:true});
    cy.contains('Add Link')
      .click({force:true});
    cy.wait(500);

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('Homepage')
      .should('have.attr', 'href', Cypress.config().baseUrl)
      .should('have.attr', 'target', '_blank');

      cy.get('li#comment-1')
        .should('exist');
  });

  it('Reply - Blockquote', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Blockquote"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myBlockQuote", {force:true});
  
    cy.get('[aria-label="Close blockquote tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true})

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
        cy.wait(1000);
      });
    cy.contains('myBlockQuote');
    cy.get('blockquote');

    cy.get('li#comment-1')
      .should('exist');
  });

  it('Reply - Deleted text (strikethrough)', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Deleted text (strikethrough)"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myDeletedText",{force:true});
  
    cy.get('[aria-label="Close deleted text tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true})

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myDeletedText');
    cy.get('del');

    cy.get('li#comment-1')
      .should('exist');
  });

  it('Reply - Inserted text', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Inserted text"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myInsertedText",{force:true});
  
    cy.get('[aria-label="Close inserted text tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myInsertedText');
    cy.get('ins');

    cy.get('li#comment-1')
      .should('exist');
  });
  
  it('Reply - Bulleted list', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Bulleted list"]')
      .click({force:true});

    // It seems that WordPress adds an enter after the <ol> tag, therefore start with {backspace}
    cy.get('textarea#replycontent.wp-editor-area')
      .type("{backspace}myBulletedList", {force:true});
  
    cy.get('[aria-label="Close bulleted list tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true})

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myBulletedList');
    cy.get('ul');

    cy.get('li#comment-1')
      .should('exist');
  });
  
  it('Reply - Numbered list', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Numbered list"]')
      .click({force:true});

    // It seems that WordPress adds an enter after the <ol> tag, therefore start with {backspace}
    cy.get('textarea#replycontent.wp-editor-area')
      .type("{backspace}myNumberedList", {force:true});
  
    cy.get('[aria-label="Close numbered list tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myNumberedList');
    cy.get('ol');

    cy.get('li#comment-1')
      .should('exist');
  });

  it('Reply - List item', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="List item"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myListItem", {force:true});
  
    cy.get('[aria-label="Close list item tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myListItem');
    cy.get('li');

    cy.get('li#comment-1')
      .should('exist');
  });

  it('Reply - Code', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    // First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
      });

    cy.get('textarea#replycontent.wp-editor-area')
      .clear({force:true});
    cy.get('[aria-label="Code"]')
      .click({force:true});

    cy.get('textarea#replycontent.wp-editor-area')
      .type("myCode",{force:true});
  
    cy.get('[aria-label="Close code tag"]')
      .click({force:true});

    cy.get('span#replybtn')
      .click({force:true});

    // Check if the reply is added
    cy.get('[data-colname="In response to"]')
      .within(() => {
        cy.contains('View Post')
          .click({force:true});
		    cy.wait(1000);
      });
    cy.contains('myCode');
    cy.get('code');

    cy.get('li#comment-1')
      .should('exist');
  });
});

// Should be last, because after spamming/deleting a reply, later posted replies will not be visible - which will break the tests for reply -> bold, italic etc.
// Might be a bug in WordPress 6.0.1
describe('Spam and trash', () => {
  beforeEach(() => {
    cy.login();
  })

  it('Spam', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    //First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    // Create new reply before labeling it as spam
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type('willBeSpammed', {force:true})
      .should('have.value', 'willBeSpammed');

    cy.get('span#replybtn')
      .click({force:true});

    // Enforce order for comments from Newest > Oldest
    cy.visit('/wp-admin/edit-comments.php');
    cy.wait(1000);

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.get('[aria-label="Mark this comment as spam"]')
          .first()
          .click({force:true});
        cy.wait(1000);
      });

    cy.contains('marked as spam');
  });

  it('Trash', () => {  
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/edit-comments.php');

    //First approve (in case it is still Unapproved by a previous step)
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Approve')
          .click({force:true});
        cy.wait(1000);
      });

    // Create new reply before deleting it
    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.contains('Reply')
          .click({force:true});
        cy.wait(1000);
      });
    cy.get('textarea#replycontent.wp-editor-area')
      .type("willBeDeleted", {force:true})
      .should('have.value', 'willBeDeleted');

    cy.get('span#replybtn')
      .click({force:true});

    // Enforce order for comments from Newest > Oldest
    cy.visit('/wp-admin/edit-comments.php');
    cy.wait(1000);

    cy.get('[data-colname="Comment"]')
      .within(() => {
        cy.get('[aria-label="Move this comment to the Trash"]')
          .first()
          .click({force:true});
        cy.wait(1000);
      });

    cy.contains('moved to the Trash');

  });
});

describe('Comments from enduser to wp-admin', () => {
  
  it('Add comment', () => {
  	cy.task('remove_test_comments');
	  cy.visit('/');

    cy.contains('Hello world!')
	    .click();

	  cy.get('[name="comment"]')
	    .type('MyComment');

	  cy.get('input#author')
	    .type('MyName');

	  cy.get('[name="email"]')
	    .type('my-email@example.com');

	  cy.get('[name="url"]')
	    .type('MyUrl');

	  cy.contains('Post Comment')
	    .click();
		
	  cy.contains('Your comment is awaiting moderation.');
		
	  // Check if the comment is available in the background
	  cy.login();
    cy.visit('/wp-admin');
	  
	  cy.get('li#wp-admin-bar-comments')
	    .within(() => {
			  cy.contains('1');
 	 	  });
	  cy.get('div.wp-menu-name')
	    .within(() => {
			  cy.get('span.awaiting-mod.count-1')
			    .click();
  	  });

      // In comments screen
  	  cy.contains('MyName');
	    cy.contains('MyUrl');
	    cy.contains('MyComment');
	  
  	  // Approve the newly added comment
    	cy.get('input#comment-search-input')
	      .type('MyName');
	    cy.get('input#search-submit.button')
	      .click({force:true});
	    cy.get('[data-colname="Comment"]')
	      .within(() => {
	        cy.contains('Approve')
	          .click({force:true});
    		});
		
  	  // Check that there are no comments
	    cy.visit('/wp-admin');
	    cy.get('li#wp-admin-bar-comments')
	      .within(() => {
		  	  cy.contains('0');
    		});
		
	  // Check if the comment is visible for normal end users
	  cy.logout();

	  cy.visit('/');
	  cy.contains('Hello world!')
	    .click();
		
	  cy.contains('MyName');
	  cy.contains('MyComment');
	  
  });
});