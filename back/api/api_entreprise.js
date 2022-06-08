module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_entreprise = require("../database/db_entreprise")();
  //const db_user = require("../database/db_user")(conn);
  //const db_product = require("../database/db_product")(conn);

  return {
    /***************
     * Entreprise  *
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

    // Get all entreprises
    getAllEntreprises: (req, res) => {
      console.log("API -> getAllEntreprises");
      db_entreprise.getAllEntreprises().then((entreprises) => {
        res.json({ err: "", success: true, data: entreprises });
      });
    },

    // Get entreprise by id
    getEntrepriseById: (req, res) => {
      console.log("API -> getEntrepriseById");
      let idEntreprise = req.params.id;
      db_entreprise.getEntrepriseById(idEntreprise).then((entreprise) => {
        res.json({ err: "", success: true, data: entreprise });
      });
    },

    // Get all entreprises by user
    getAllEntreprisesByUser: (req, res) => {
      console.log("API -> allEntreprisesByUser");
      if (check.checkUserConnected(req, res)) {
        let userId = req.params.userId;
        db_entreprise.getAllEntreprisesByUser(userId).then((entreprises) => {
          res.json({ err: "", success: true, data: entreprises });
        });
      }
    },

    /* POST */
    // Ajouter une entreprise
    addEntreprise: (req, res) => {
      console.log("API -> addEntreprise");
      //check if user is connected
      if (check.checkUserConnected(req, res)) {
        let name = req.query.name;
        let adresse = req.query.adresse;

        let id_dirigeant = req.session.userId;
        dataEntreprise = { name, id_dirigeant, adresse };
        console.log(req.session);

        db_entreprise.addEntreprise(dataEntreprise).then(() => {
          res.json({ err: "", success: true });
        });
      }
    },
  };
};
