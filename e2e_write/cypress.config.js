const { defineConfig } = require("cypress");
const siteIpAddress = '192.168.2.102';

const wordpressUserId = 'TestUser';
const wordpressPassword = 'C1nder3llaInW0rdpre$$!';

const databaseName = 'wordpress';
const databaseUserId = 'root';
const databasePassword = 'C1nder3llaInW0rdpre$$!';

async function execute_sql(sqlstatement) {
	var mysql = require('mysql2'); 

	var con = mysql.createConnection({
	  host: siteIpAddress,
	  database: databaseName,
	  user: databaseUserId,
	  password: databasePassword
	});
  
	con.connect(function(err) {
	  if (err) throw err;
  
	  con.query(sqlstatement, function(err, result) {
		if (err) throw err;
		console.log('Statement: ' + sqlstatement)
		console.log('Number of records deleted: ' + result.affectedRows);
	  });
	});
};

module.exports = defineConfig({
  env: {
    siteIpAddress: siteIpAddress,
    wordpressUserId: wordpressUserId,
    wordpressPassword: wordpressPassword,
    databaseName: databaseName
  },
  e2e: {
    baseUrl: 'http://'+siteIpAddress,
    experimentalSessionAndOrigin: true,
    specPattern: '\\demo\\write\\cypress\\**\\*.cy.js',
    supportFile: '\\demo\\write\\support\\e2e.js',
    setupNodeEvents(on, config) {
      on('task', {
        remove_test_comments() {
            execute_sql('DELETE FROM wp_comments WHERE comment_author != "A WordPress Commenter";')

            return null;
        },
		delete_categories() {
			execute_sql('DELETE FROM wp_terms WHERE term_id >= 3;');
			execute_sql('DELETE FROM wp_term_taxonomy WHERE term_id >= 3;');
			
			return null;
		},
		delete_posts() {
			execute_sql('DELETE FROM wp_posts WHERE ID >= 4;');
			execute_sql('DELETE FROM wp_postmeta WHERE post_id >= 4;');
			
			return null;
		},
        'uncaught:exception'(err, runnable) {
          return false;
        }

      })
    }
  }
});