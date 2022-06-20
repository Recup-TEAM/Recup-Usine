module.exports = function () {
  const db_query = require("../db_config")().db_query;

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

    // Get user by id
    getUserById: async (id) => {
      let sql = "SELECT * FROM user WHERE id_user='" + id + "'";
      rq = await db_query(sql);
      return {
        email: rq[0].email,
        compte_level: rq[0].compte_level,
        id: rq[0].id_user,
        registerDate: rq[0].register_date,
      };
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
      console.log(sql);
      var rq = await db_query(sql);
      return rq;
    },

    // changeSubscriptionPrice : 
    changeSubscriptionPrice: async (subscriptionId, price) => {
      let sql = "UPDATE subscription SET price='" + price + "' WHERE id_subscription='" + subscriptionId + "'";
      console.log(sql);
      var rq = await db_query(sql);
      return rq;
    },

    // changeSubscriptionDuration :
    changeSubscriptionDuration: async (subscriptionId, duration) => {
      let sql = "UPDATE subscription SET subscription_duration='" + duration + "' WHERE id_subscription='" + subscriptionId + "'";
      console.log(sql);
      var rq = await db_query(sql);
      return rq;
    },

    /* POST */
    // Connexion
    login: async ({ email, password }) => {
      let sql =
        "SELECT * FROM user WHERE email='" +
        email +
        "' and password = '" +
        password +
        "'";
      var rq = await db_query(sql);

      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      //resultArray.forEach((v) => console.log(v));

      if (resultArray.length == 0) {
        return false;
      } else {
        return resultArray;
      }
    },

    // Créer un compte
    createUser: async (dataUser) => {
      let sql =
        "INSERT INTO `user` (`id_user`, `email`, `password`, `compte_level`, `register_date`)" +
        "VALUES (NULL, '" +
        dataUser.email +
        "', '" +
        dataUser.password +
        "', '" +
        dataUser.compteLevel +
        "', CURRENT_TIMESTAMP)";

      var rq = await db_query(sql);
      return rq.insertId;
    },

    // Changer le mot de passe
    updateUserPassword: async ({ email, oldPassword, newPassword }) => {
      let sql =
        "UPDATE `user` SET `password` = '" +
        newPassword +
        "' WHERE `user`.`email` = '" +
        email +
        "' and `user`.`password` = '" +
        oldPassword +
        "';";
      var rq = await db_query(sql);
      if (rq.affectedRows == 0) {
        return false;
      } else {
        return true;
      }
    },

    // Reset password
    resetPassword: async ({ id, password, temp_pswd}) => {
      let sql = "UPDATE `user` SET `password` = '" + password + "' WHERE `user`.`id_user` = '" + id + "' AND `user`.`password`='" + temp_pswd+ "';";
      var rq = await db_query(sql);
      if (rq.affectedRows == 0) {
        return false;
      } else {
        return true;
      }
    },

    // Changer l'email
    updateUserEmail: async ({ userId, newEmail }) => {
      let sql =
        "UPDATE `user` SET `email` = '" +
        newEmail +
        "' WHERE `user`.`id_user` = '" +
        userId +
        "';";
      var rq = await db_query(sql);
      return rq;
    },

    // Changer le level d'un compte
    updateUSerLevel: async ({ email, compteLevel }) => {
      let sql =
        "UPDATE `user` SET `compteLevel` = '" +
        compteLevel +
        "' WHERE `user`.`email` = '" +
        email +
        "';";
      var rq = await db_query(sql);
      return rq;
    },

    // Subscribe to a plan
    subscribe: async ({ userId, subscriptionType }) => {
      let sql =
        "INSERT INTO `subscription` (`id_subscription`, `id_user`, `subscription_type`, `start_date`)" +
        "VALUES (NULL, '" +
        userId +
        "', '" +
        subscriptionType +
        "', NULL);";
      console.log(sql);
      rq = await db_query(sql);
      return rq;
    },
  };
};
