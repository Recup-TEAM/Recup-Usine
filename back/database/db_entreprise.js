module.exports = function () {
  const db_query = require("../db_config")().db_query;

  return {
    /***************
     * Entreprise  *
     ***************/

    /* GET */
    // Get all entreprise
    getAllEntreprises: async () => {
      let sql = "SELECT * FROM entreprise";
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    // Get entreprise by id (TODO : test)
    getEntrepriseById: async (id) => {
      let sql = "SELECT * FROM entreprise WHERE id_entreprise='" + id + "'";
      var rq = await db_query(sql);
      return rq;
    },

    // Get all entreprise by id-user
    getAllEntreprisesByIdUser: async (id) => {
      let sql = "SELECT * FROM entreprise WHERE id_user='" + id + "'";
      console.log(sql);
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    // Get all entreprise by id-user
    acceptRecupartenaire: async (id) => {
      let sql = "UPDATE entreprise SET accepted = 1 WHERE id_entreprise='" + id + "'";
      console.log(sql);
      var rq = await db_query(sql);
      return rq;
    },

    /* POST */
    // Ajouter une entreprise
    addEntreprise: async (dataEntreprise) => {
      let sql =
        "INSERT INTO `entreprise` (`id_entreprise`, `name`, `id_user`, `adresse`, `descRegister`, `img`)" +
        "VALUES (NULL, ?,?,?,?,?)";
      var rq = await db_query(sql , [dataEntreprise.name, dataEntreprise.id_dirigeant, dataEntreprise.adresse, dataEntreprise.descRegister, dataEntreprise.imgPath]);
      return rq;
    },

    // Request a collect
    requestCollect: async (id_entreprise) => {
      //update need_collect to 1
      let sql = "UPDATE entreprise SET need_collect=1 WHERE id_entreprise='" + id_entreprise + "'";
      var rq = await db_query(sql);
      return rq;
    },

    // Delete an entreprise
    deleteEntrepriseById: async (id) => {
      let sql = "DELETE FROM entreprise WHERE id_entreprise='" + id + "'";
      var rq = await db_query(sql);
      return rq;
    },

  };
};
