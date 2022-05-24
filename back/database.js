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

  // node native promisify
const query = util.promisify(db.query).bind(db);

module.exports = {
    // get un user
    getUser: async ({email, password}) => {
        console.log("get user -> email : "+ email + " pw : "  +password);
        let sql = "SELECT * FROM user WHERE email='" + email + "' and password = '" + password + "'";
        var rq = await query(sql);

        global.resultArray = Object.values(JSON.parse(JSON.stringify(rq)))
        resultArray.forEach((v) => console.log(v));

        console.log("resultt : "+ resultArray);
        if (resultArray.length == 0) {
            return false;
        } else {
            return resultArray;
        }
     
    },

    // Créer un compte
    createUser: async (dataUser) => {
        const student = "User créé avec succès";
        return student;
    },

    getTokens: async () => {
        let users = await Users.find({}).select("-_id -__v");
        let tokens = [];
        for (const user of users) {
            if (user.admin == true) {
                tokens.push(md5(user.email + user.password));
            }
        }
        return tokens;
    },
};
