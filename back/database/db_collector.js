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

    // Get collector by id user
    getCollectorByIdUser: async (id) => {
      let sql = "SELECT * FROM collector WHERE id_user = ?";
      var rq = await db_query(sql, [id]);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    // Get collector by id
    getCollectorById: async (id) => {
      let sql = "SELECT * FROM collector WHERE id = ?";
      var rq = await db_query(sql, [id]);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    // Get all entreprises who need collect
    getAllEntrepriseWhoNeedCollect: async () => {
      let sql = "SELECT * FROM `entreprise` WHERE `need_collect`=1 OR `trash_quantity`>70";
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },
    
    // getItinaryByCollectorId
    getItinaryByCollectorId: async (id) => {
      let sql = "SELECT * FROM `itinary` WHERE `id_collector`=?";
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
        "', '1', '0', '" + //here
        id_user +
        "' );";
      var rq = await db_query(sql);
      return rq;
    },

    // updateCollectorDemande
    updateCollectorDemande: async (id) => {
      let sql = "UPDATE `collector` SET `accepted` = '1' WHERE `collector`.`id` = " + id + ";";
      var rq = await db_query(sql);
      return rq;
    },

    // Delete collector by id
    deleteCollector: async (id) => {
      let sql = "DELETE FROM `collector` WHERE `collector`.`id` = " + id + ";";
      var rq = await db_query(sql);
      console.log(sql);
      return rq;
    },
  };
};
