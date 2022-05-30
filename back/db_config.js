const mysql = require('mysql');
const util = require('util');

module.exports = function () {
var conn = mysql.createConnection({
    connectionLimit : 10,
    //host     : '152.228.171.235',
    //port     :  80,
      user: "root",
    //user: 'recupUser',
    //password: 'r3cupUserP4ss',
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
