const mysql = require('mysql');
const util = require('util');
//const { message } = require('statuses');

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
  global.db = conn;

  // node native promisify (support async/await)
const query = util.promisify(db.query).bind(db);

module.exports = {
    // get un user
    getUser: async ({email, password}) => {
        let sql = "SELECT * FROM user WHERE email='" + email + "' and password = '" + password + "'";
        var rq = await query(sql);

        global.resultArray = Object.values(JSON.parse(JSON.stringify(rq)))
        //resultArray.forEach((v) => console.log(v));

        if (resultArray.length == 0) {
            return false;
        } else {
            return resultArray;
        }
     
    },

    // Créer un compte
    createUser: async (dataUser) => {
        let sql = "INSERT INTO `user` (`id`, `email`, `password`, `compteLevel`)" +
                   "VALUES (NULL, '" + dataUser.email + "', '" + dataUser.password + "', '" + dataUser.compteLevel + "');"

        var rq = await query(sql);
        return rq;
    },

};
