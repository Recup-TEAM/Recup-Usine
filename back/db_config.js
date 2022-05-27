const mysql = require('mysql');

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


  // node native promisify (support async/await)
global.db_query = util.promisify(conn.query).bind(conn);
