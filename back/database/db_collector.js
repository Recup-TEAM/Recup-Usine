module.exports = function () {
  const db_query = require("../db_config")().db_query;

  return {
    /***************
    *  Collector  *
     ***************/

    /* GET */
    // Get all entreprise
    getAllEntreprises: async () => {
      let sql = "SELECT * FROM entreprise";
      var rq = await db_query(sql);
      resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
      return rq;
    },

    /* POST */
    //createDemande
    createDemande: async (name, email, prenom) => {
      let sql = "INSERT INTO `collector` (`id`, `nom`, `prenom`, `email`) VALUES (NULL, '" + name + "', '" + prenom + "', '" + email + "');";
      var rq = await db_query(sql);
      return rq;
    }
    
  };
};
