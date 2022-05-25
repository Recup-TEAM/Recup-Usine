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

    /***************
     *    User     *
     ***************/

    // Get user by email
    getUser: async (email) => {
        let sql = "SELECT * FROM user WHERE email='" + email + "'";
        rq = await query(sql);
        // if user return true else return false
        if (rq.length == 0) {
            return false;
        } else {
            return true;
        }
    },

    // Connexion
    login: async ({email, password}) => {
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
    
    // Changer le mot de passe
    updateUserPassword: async ({email, password, newpassword}) => {
        let sql = "UPDATE `user` SET `password` = '" + newpassword + "' WHERE `user`.`email` = '" + email + "' and `user`.`password` = '" + password + "';";
        var rq = await query(sql);
        return rq;
    },


    // Changer le level d'un compte
    updateUSerLevel: async ({email, compteLevel}) => {
        let sql = "UPDATE `user` SET `compteLevel` = '" + compteLevel + "' WHERE `user`.`email` = '" + email + "';";
        var rq = await query(sql);
        return rq;
    },

    // Get all user
    getAllUsers: async () => {
        let sql = "SELECT * FROM user";
        var rq = await query(sql);
        return rq;
    },



    /***************
     * Entreprise  *
     ***************/

    // Get all entreprise
    getAllEntreprises: async () => {
        let sql = "SELECT * FROM entreprise";
        var rq = await query(sql);
        return rq;
    },

    // Get tout les produits une entreprise
    getAllProductsFrom: async (id) => {
        let sql = "SELECT * FROM produit WHERE entreprise_id='" + id + "'";
        var rq = await query(sql);
        return rq;
    },

    // Get tout les produits
    getAllProducts: async () => {
        let sql = "SELECT * FROM produit";
        var rq = await query(sql);
        return rq;
    },

    // Get un produit
    getProductById: async (id) => {
        let sql = "SELECT * FROM produit WHERE id='" + id + "'";
        var rq = await query(sql);
        return rq;
    },



};
