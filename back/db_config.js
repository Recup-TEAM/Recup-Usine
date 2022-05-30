const mysql = require('mysql');
const util = require('util');

module.exports = function () {
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recupusine'
  });
  
  conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });


  return {
  // node native promisify (support async/await)
  db_query : util.promisify(conn.query).bind(conn)
  };
};
