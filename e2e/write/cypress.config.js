const { defineConfig } = require("cypress");
const siteIpAddress = '192.168.2.28'
const userId = 'TestUser'
const password = 'C1nder3llaInW0rdpre$$!'
const databaseName = 'wordpress'

async function execute_sql(sqlstatement) {
	var mysql = require('mysql'); 

	var con = mysql.createConnection({
	  host: siteIpAddress,
	  user: "root",
	  password: password,
	  database: databaseName
	});
  
	con.connect(function(err) {
	  if (err) throw err;
  
	  con.query(sqlstatement, function(err, result) {
		if (err) throw err;
		console.log('Statement: ' + sqlstatement)
		console.log('Number of records deleted: ' + result.affectedRows);
	  });
	});

}

module.exports = defineConfig({
  env: {
	  siteIpAddress: siteIpAddress,
    userId: userId,
    password: password,
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
})