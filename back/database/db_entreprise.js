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
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },
    

    /* POST */
    // Ajouter une entreprise
    addEntreprise: async (dataEntreprise) => {
      let sql =
        "INSERT INTO `entreprise` (`id_entreprise`, `name`, `id_user`, `adresse`, `descRegister`, `img`)" +
        "VALUES (NULL, '" +
        dataEntreprise.name +
        "', '" +
        dataEntreprise.id_dirigeant +
        "', '" +
        dataEntreprise.adresse +
        "', '" +
        dataEntreprise.descRegister +
        "', '" +
        dataEntreprise.imgPath +
        "');";
      var rq = await db_query(sql);
      return rq;
    },
  };
};
