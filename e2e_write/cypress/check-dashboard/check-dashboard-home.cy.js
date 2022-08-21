describe('Check Screen options', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Open Screen Options', () => {
    cy.visit('/wp-admin/index.php');

    cy.contains('Screen Options')
	    .click({force: true});
  });

  it('Site Health Status', () => {
    cy.visit('/wp-admin/index.php');
  
	  cy.get('input#dashboard_site_health-hide.hide-postbox-tog')
	    .should('be.checked')
	    .click({force: true})
	    .should('not.be.checked')
	    .click({force: true})
	    .should('be.checked');
  });

  it('At a Glance', () => {
    cy.visit('/wp-admin/index.php');

    cy.get('input#dashboard_right_now-hide.hide-postbox-tog')
      .should('be.checked')
      .click({force: true})
      .should('not.be.checked')
      .click({force: true})
      .should('be.checked');
  });

  it('Activity', () => {
    cy.visit('/wp-admin/index.php');

    cy.get('input#dashboard_activity-hide.hide-postbox-tog')
      .should('be.checked')
      .click({force: true})
      .should('not.be.checked')
      .click({force: true})
      .should('be.checked');
  });

  it('Quick Draft', () => {
    cy.visit('/wp-admin/index.php');
  
    cy.get('input#dashboard_quick_press-hide.hide-postbox-tog')
	    .should('be.checked')
	    .click({force: true})
	    .should('not.be.checked')
	    .click({force: true})
	    .should('be.checked');
  });

  it('WordPress Events and News', () => {
    cy.visit('/wp-admin/index.php');
  
    cy.get('input#dashboard_primary-hide.hide-postbox-tog')
	    .should('be.checked')
	    .click({force: true})
	    .should('not.be.checked')
	    .click({force: true})
	    .should('be.checked');
  });

  it('Welcome', () => {
    cy.visit('/wp-admin/index.php');
  
    cy.get('input#wp_welcome_panel-hide')
	    .should('be.checked')
	    .click({force: true})
	    .should('not.be.checked')
	    .click({force: true})
	    .should('be.checked');
  });

  it('Close Screen Options', () => {
    cy.visit('/wp-admin/index.php');

    cy.contains('Screen Options')
	    .click({force: true});
  });
});

describe('Check Site Health Status', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check link in Site Health Status window', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Site Health screen')
      .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/site-health.php');
  });
});

describe('Check Quick Draft', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check Title', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.get('input#title')
	    .type('My New Blog Post')
	    .should('have.value', 'My New Blog Post');
  });

  it('Check Content', () => {
    cy.visit('/wp-admin/index.php');

    cy.get('[placeholder="What’s on your mind?"]')
	    .type('Content of Blog Post')
	    .should('have.value', 'Content of Blog Post');  
  });

  it('Save Draft', () => {
    cy.visit('/wp-admin/index.php');

    cy.get('input#title')
	    .type('My New Blog Post');
    cy.get('[placeholder="What’s on your mind?"]')
	    .type('Content of Blog Post');

    cy.contains('Save Draft')
	    .click();

    cy.contains('My New Blog Post')
	    .should('have.attr', 'href');
  });
});

describe('Check At a Glance', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check 1 Post', () => {
    cy.task('delete_posts');
    cy.visit('/wp-admin/index.php')
	
    cy.contains('1 Post')
	    .should('have.attr', 'href', 'edit.php?post_type=post');
  });

  it('Check 1 Comment', () => {
    cy.task('remove_test_comments');
    cy.visit('/wp-admin/index.php');
	
    cy.contains('1 Comment')
      .should('have.attr', 'href', 'edit-comments.php');
  });

  it('Check 1 Page', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('1 Page')
      .should('have.attr', 'href', 'edit.php?post_type=page');
  });
});

describe('Activity', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check last post', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Hello world!')
      .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/post.php?post=1&action=edit');
  });

  it('Check Recent Comments', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('A WordPress Commenter')
      .should('have.attr', 'href', 'https://wordpress.org/');
  });

  it('Check Recent Comments - Approve', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Approve')
      .should('have.attr', 'href').and('include', 'comment.php?action=approvecomment&p=1&c=1&_wpnonce=');
  });

  it('Check Recent Comments - Unapprove', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Unapprove')
      .should('have.attr', 'href').and('include', 'comment.php?action=unapprovecomment&p=1&c=1&_wpnonce=');
  });

  it('Check Recent Comments - Reply - textblock present', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Reply')
	    .click({force:true});
	  cy.get('textarea#replycontent.wp-editor-area');
  });

  it('Check Recent Comments - Reply - type normal text', () => {
    cy.visit('/wp-admin/index.php');
    cy.wait(1000);

    cy.contains('Reply')
	    .click({force:true});
  	cy.get('textarea#replycontent.wp-editor-area')
	    .type('Normal text', {force:true});
  });

  it('Check Recent Comments - Edit', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.get('div.dashboard-comment-wrap')
	    .within(() => {
        cy.contains('Edit')
	        .should('have.attr', 'href', 'comment.php?action=editcomment&c=1');
	  });
  });

  it('Check Recent Comments - Spam', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Spam')
      .should('have.attr', 'href').and('include', 'comment.php?action=spamcomment&p=1&c=1&_wpnonce=');
  });
  
  it('Check Recent Comments - Trash', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('Trash')
      .should('have.attr', 'href').and('include', 'comment.php?action=trashcomment&p=1&c=1&_wpnonce=');
  });
  
  it('Check Recent Comments - View', () => {
    cy.visit('/wp-admin/index.php');
	
    cy.contains('View')
      .should('have.attr', 'href');
  });
});
