const mysql = require("mysql2");
const util = require("util");
var conn, db_query;
function getConnection() {
  conn = mysql.createConnection({
    connectionLimit: 10,
    host: "152.228.171.235",
    port: 3006,
    user: "RecupUsineBDD",
    password: "r3cupUserP4ss",
    database: "recupusine",

    /* Setting for localhost */
    /*host: 'localhost',
      user: 'root',
      password: '',
      database: 'recupusine'*/
  });

  conn.connect(function (err) {
    if (err) throw err;
    console.log("Database is connected successfully !");
  });
  db_query =  util.promisify(conn.query).bind(conn)
}

module.exports = function () {
  return {
    // launch database connection
    connect: getConnection(),

    // node native promisify (support async/await)
    db_query: db_query,
  };
};
