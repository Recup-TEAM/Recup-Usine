module.exports = function() {
    //get db_query from db_config.js'
    db_query = require("../db_config")().db_query;
 
     return {
        /***************
         *    User     *
         ***************/
        /* GET */
        // Get user by email
        getUser: async (email) => {
            let sql = "SELECT * FROM user WHERE email='" + email + "'";
            rq = await db_query(sql);
            // if user return true else return false
            if (rq.length == 0) {
                return false;
            } else {
                return true;
            }
        },

        // Get all user
        getAllUsers: async () => {
        let sql = "SELECT * FROM user";
        var rq = await db_query(sql);
        return rq;
        },

        // Get current subscription of user
        getSubscription: async (userId) => {
            let sql = "SELECT * FROM subscription WHERE id_user='" + userId + "'";
            var rq = await db_query(sql);
            return rq;
        },


        /* POST */
        // Connexion
        login: async ({email, password}) => {
            let sql = "SELECT * FROM user WHERE email='" + email + "' and password = '" + password + "'";
            var rq = await db_query(sql);

            resultArray = Object.values(JSON.parse(JSON.stringify(rq)))
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

            var rq = await db_query(sql);
            return rq;
        },

        // Changer le mot de passe
        updateUserPassword: async ({email, password, newpassword}) => {
            let sql = "UPDATE `user` SET `password` = '" + newpassword + "' WHERE `user`.`email` = '" + email + "' and `user`.`password` = '" + password + "';";
            var rq = await db_query(sql);
            return rq;
        },

        // Changer le level d'un compte
        updateUSerLevel: async ({email, compteLevel}) => {
            let sql = "UPDATE `user` SET `compteLevel` = '" + compteLevel + "' WHERE `user`.`email` = '" + email + "';";
            var rq = await db_query(sql);
            return rq;
        },

        // Subscribe to a plan
        subscribe: async ({userId, subscriptionLevel}) => {
            let sql = "INSERT INTO `subscription` (`id_subscription`, `id_user`, `subscription_level`, `start_date`)" +
                    "VALUES (NULL, '" + userId + "', '" + subscriptionLevel + "', NULL);"
            console.log(sql);
            rq = await db_query(sql);
            return rq;
        }

    }
};
