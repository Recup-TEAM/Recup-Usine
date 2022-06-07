const db_collector = require("../database/db_collector");

module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_collector = require("../database/db_collector")();

  return {
    /***************
     *  Collector  *
     ***************/

    /* GET */
    // getEntreprisetDataOfCurrentUser
    getEntreprisetDataOfCurrentUser: function (req, res) {
      console.log("API -> getEntreprisetDataOfCurrentUser");
      if (check.checkUserConnected(req, res)) {
        let userId = req.params.userId;
        db_entreprise.getAllEntreprisesByIdUser(userId).then((entreprise) => {
          res.json({ err: "", success: true, data: entreprise });
        });
      } else {
        res.json({ err: "Vous n'êtes pas connecté", success: false, data: null });
      }
    },

    /* POST */
    //createDemande
    createDemande: function (req, res) {
      console.log("API -> createDemande");
      // get name, email and prenom from body
      let name = req.body.nom;
      let email = req.body.email;
      let prenom = req.body.prenom;
      db_collector.createDemande(name, email, prenom).then((result) => {
        res.json({ err: "", success: true, data: result });
      });
    },
  };
};
