module.exports = function () {
  const db_query = require("../db_config")().db_query;

  return {
    /***************
     *  Collector  *
     ***************/

    /* GET */
    // Get all collector
    getAllCollector: async () => {
      let sql = "SELECT * FROM collector";
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    // Get collector by id
    getCollectorByIdUser: async (id) => {
      let sql = "SELECT * FROM collector WHERE id_user = ?";
      var rq = await db_query(sql, [id]);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    /* POST */
    //createDemande
    createDemande: async (name, email, prenom, id_user) => {
      let sql =
        "INSERT INTO `collector` (`id`, `nom`, `prenom`, `email`, `accepted`, `tour`, `id_user`) VALUES (NULL, '" +
        name +
        "', '" +
        prenom +
        "', '" +
        email +
        "', '0', '0', '" +
        id_user +
        "' );";
      var rq = await db_query(sql);
      return rq;
    },

    // Delete collector by id
    deleteCollector: async (id) => {
      let sql = "DELETE FROM `collector` WHERE `collector`.`id_user` = ?";
      var rq = await db_query(sql, [id]);
      return rq;
    },
  };
};
