describe('Check logged in', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check logged in', () => {
    cy.visit('/wp-admin');

	cy.contains('Howdy, TestUser');
  });
});

describe('Check +New', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check New > Post', () => {	
    cy.visit('/wp-admin');

	cy.get('li#wp-admin-bar-new-content.menupop')
	  .contains('Post')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/post-new.php');
  });  

  it('Check New > Media', () => {	
    cy.visit('/wp-admin');

	cy.get('li#wp-admin-bar-new-content.menupop')
	  .contains('Media')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/media-new.php');
  });

  it('Check New > Page', () => {	
    cy.visit('/wp-admin');

	cy.get('li#wp-admin-bar-new-content.menupop')
	  .contains('Page')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/post-new.php?post_type=page');
  });

  it('Check New > User', () => {	
    cy.visit('/wp-admin');

	cy.get('li#wp-admin-bar-new-content.menupop')
	  .contains('User')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/wp-admin/user-new.php');
  });
});

describe('Check Comments', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check number of open comments = 0', () => {
    cy.visit('/wp-admin');

	cy.get('span.ab-label.awaiting-mod.pending-count.count-0');
  });
  
  it('Check URL in comments in bar', () => {
    cy.visit('/wp-admin');

    // Very hard to test without a click()
 	cy.get('li#wp-admin-bar-comments')
	  .click();
	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/edit-comments.php');
  });
});

describe('Blog Site > Visit Site', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check URL of Visit Site', () => {
    cy.visit('/wp-admin');

	cy.get('li#wp-admin-bar-site-name')
	  .contains('Visit Site')
	  .should('have.attr', 'href', Cypress.config().baseUrl+'/');
  });
});

describe('Left menu > Dashboard', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
	    cy.contains('Dashboard')
	      .click();
	  });

	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/index.php');
  });
  
  it('Check URL of Home', () => {
    cy.visit('/wp-admin/index.php');

	cy.get('a.wp-first-item.current')
	  .contains('Home')
	  .should('have.attr', 'href', 'index.php');
  });

  it('Check URL of Updates', () => {
    cy.visit('/wp-admin/index.php');

	cy.contains('Updates')
	  .should('have.attr', 'href', 'update-core.php');
  });
  
});

describe('Left menu > Posts', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
	    cy.contains('Posts')
	      .click();
	  });
	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/edit.php');
  });
  
  it('Check URL of All posts', () => {
    cy.visit('/wp-admin/edit.php');

	cy.get('[id="menu-posts"]')
	  .within(() => {
		cy.contains('All Posts')
	      .should('have.attr', 'href', 'edit.php');
	  });
  });

  it('Check URL of Add New', () => {
    cy.visit('/wp-admin/edit.php');

	cy.get('[id="menu-posts"]')
	  .within(() => {
		cy.contains('Add New')
		  .should('have.attr', 'href', 'post-new.php');
	  });
  });
  
  it('Check URL of Categories', () => {
    cy.visit('/wp-admin/edit.php');

	cy.get('[id="menu-posts"]')
	  .within(() => {
  	    cy.contains('Categories')
	      .should('have.attr', 'href', 'edit-tags.php?taxonomy=category');
	  });
  });
  
  it('Check URL of Tags', () => {
    cy.visit('/wp-admin/edit.php');

	cy.get('[id="menu-posts"]')
	  .within(() => {
  	    cy.contains('Tags')
	      .should('have.attr', 'href', 'edit-tags.php?taxonomy=post_tag');
	  });
  });
  
});

describe('Left menu > Media', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
	    cy.contains('Media')
	      .click();
	  });

	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/upload.php');
  });
  
  it('Check URL of Library', () => {
    cy.visit('/wp-admin/upload.php');

	cy.get('[id="menu-media"]')
	  .within(() => {
	    cy.contains('Library')
	      .should('have.attr', 'href', 'upload.php');
	  });
  });

  it('Check URL of Add New', () => {
    cy.visit('/wp-admin/upload.php')

	cy.get('[id="menu-media"]')
	  .within(() => {
		  cy.contains('Add New')
	        .should('have.attr', 'href', 'media-new.php');
	  });
  });
});

describe('Left menu > Pages', () => {
  beforeEach(() => {
    cy.login()
  });

  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
	    cy.contains('Pages')
	      .click();
	  });

    cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/edit.php?post_type=page');
  });
  
  it('Check URL of All Pages', () => {
    cy.visit('wp-admin/edit.php?post_type=page');

	cy.get('[id="menu-pages"]')
	  .within(() => {
  	    cy.contains('All Pages')
	      .should('have.attr', 'href', 'edit.php?post_type=page');
	  });
  });

  it('Check URL of Add New', () => {
    cy.visit('wp-admin/edit.php?post_type=page');

	cy.get('[id="menu-pages"]')
	  .within(() => {
		  cy.contains('Add New')
	        .should('have.attr', 'href', 'post-new.php?post_type=page');
	  });
  });
    
});

describe('Left menu > Comments', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
	    cy.contains('Comments')
	      .click();
	  });

    cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/edit-comments.php');
  });

});

describe('Left menu > Appearance', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
		cy.contains('Appearance')
	      .click();
	  });

	  cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/themes.php');
  });

  it('Check URL of Themes', () => {
    cy.visit('/wp-admin/themes.php');

	cy.get('[id="menu-appearance"]')
	  .within(() => {
	    cy.contains('Themes')
	      .should('have.attr', 'href', 'themes.php');
	  });
  });

  it('Check URL of Editor', () => {
    cy.visit('/wp-admin/themes.php');

	cy.get('[id="menu-appearance"]')
	  .within(() => {
		  cy.contains('Editor')
	        .should('have.attr', 'href', 'site-editor.php');
	  });
  });

});

describe('Left menu > Plugins', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
	    cy.contains('Plugins')
	      .click();
	  });

	cy.url()
      .should('eq', Cypress.config().baseUrl+'/wp-admin/plugins.php');
  });  

  it('Check URL of Installed Plugins', () => {
    cy.visit('/wp-admin/plugins.php');

	cy.get('[id="menu-plugins"]')
	  .within(() => {
	    cy.contains('Installed Plugins')
	      .should('have.attr', 'href', 'plugins.php');
	  });
  });

  it('Check URL of Add New', () => {
    cy.visit('wp-admin/plugins.php');

	cy.get('[id="menu-plugins"]')
	  .within(() => {
		  cy.contains('Add New')
	        .should('have.attr', 'href', 'plugin-install.php');
	  });
  });
});    
	
describe('Left menu > Users', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
	    cy.contains('Users')
	      .click();
	  });

    cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/users.php');
  });

  it('Check URL of All Users', () => {
    cy.visit('/wp-admin/users.php');

	cy.get('[id="menu-users"]')
	  .within(() => {
	    cy.contains('All Users')
	      .should('have.attr', 'href', 'users.php');
	  });
  });

  it('Check URL of Add New', () => {
    cy.visit('/wp-admin/users.php');

	cy.get('[id="menu-users"]')
	  .within(() => {
		  cy.contains('Add New')
	        .should('have.attr', 'href', 'user-new.php');
	  });
  });
    
  it('Check URL of Profile', () => {
    cy.visit('/wp-admin/users.php');

	cy.get('[id="menu-users"]')
	  .within(() => {
		  cy.contains('Profile')
	        .should('have.attr', 'href', 'profile.php');
	  });
  });
    
});

describe('Left menu > Tools', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
        // Very hard to test without a click()
	    cy.contains('Tools')
	      .click();
	  });
	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/tools.php');
  });

  it('Check URL of Available Tools', () => {
    cy.visit('/wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
	    cy.contains('Available Tools')
	      .should('have.attr', 'href', 'tools.php');
	  });
  });

  it('Check URL of Import', () => {
    cy.visit('/wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Import')
	        .should('have.attr', 'href', 'import.php');
	  });
  });
    
  it('Check URL of Export', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Export')
	        .should('have.attr', 'href', 'export.php');
	  });
  });

  it('Check URL of Site Health', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Site Health')
	        .should('have.attr', 'href', 'site-health.php');
	  });
  });
    
  it('Check URL of Export Personal Data', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Export Personal Data')
	        .should('have.attr', 'href', 'export-personal-data.php');
	  });
  });
    
  it('Check URL of Erase Personal Data', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Erase Personal Data')
	        .should('have.attr', 'href', 'erase-personal-data.php');
	  });
  });
    
  it('Check URL of Theme File Editor', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Theme File Editor')
	        .should('have.attr', 'href', 'theme-editor.php');
	  });
  });
    
  it('Check URL of Plugin File Editor', () => {
    cy.visit('wp-admin/tools.php');

	cy.get('[id="menu-tools"]')
	  .within(() => {
		  cy.contains('Plugin File Editor')
	        .should('have.attr', 'href', 'plugin-editor.php');
	  });
  });
    
});

describe('Left menu > Settings', () => {
  beforeEach(() => {
    cy.login();
  });
  
  it('Check URL of main menu', () => {
    cy.visit('/wp-admin');

	cy.get('[aria-label="Main menu"]')
	  .within(() => {
	    cy.contains('Settings')
	      .click();
	  });

	cy.url()
	  .should('eq', Cypress.config().baseUrl+'/wp-admin/options-general.php');
  });  

  it('Check URL of Available Tools', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
	    cy.contains('General')
	      .should('have.attr', 'href', 'options-general.php');
	  });
  });

  it('Check URL of Writing', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Writing')
	        .should('have.attr', 'href', 'options-writing.php');
	  });
  });
    
  it('Check URL of Reading', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Reading')
	        .should('have.attr', 'href', 'options-reading.php');
	  });
  });

  it('Check URL of Discussion', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Discussion')
	        .should('have.attr', 'href', 'options-discussion.php');
	  });
  });

  it('Check URL of Media', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Media')
	        .should('have.attr', 'href', 'options-media.php');
	  });
  });

  it('Check URL of Permalinks', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Permalinks')
	        .should('have.attr', 'href', 'options-permalink.php');
	  });
  });

  it('Check URL of Privacy', () => {
    cy.visit('/wp-admin/options-general.php');

	cy.get('[id="menu-settings"]')
	  .within(() => {
		  cy.contains('Privacy')
	        .should('have.attr', 'href', 'options-privacy.php');
	  });
  });
    
});
