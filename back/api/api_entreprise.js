module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_entreprise = require("../database/db_entreprise")();

  return {
    /***************
     * Entreprise  *
     ***************/

    /* GET */
    // getEntreprisetDataOfCurrentUser
    getEntreprisetDataOfCurrentUser: function (req, res) {
      console.log("API -> getEntreprisetDataOfCurrentUser");
      if (check.checkUserConnected(req, res)) {
        let userId = req.session.userId;
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
        let userId = req.params.id;

        db_entreprise.getAllEntreprisesByIdUser(userId).then((entreprises) => {
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
        let name = req.body.name;
        let adresse = req.body.adresse;
        let id_dirigeant = req.session.userId;
        let imgPath = req.body.imgPath;
        let descRegister = req.body.descRegister;

        dataEntreprise = { name, id_dirigeant, adresse, descRegister, imgPath};

        db_entreprise.addEntreprise(dataEntreprise).then(() => {
          res.json({ err: "", success: true, data: dataEntreprise });
        });
      }
    },

  // Request a collect
  requestCollect: (req, res) => {
    console.log("API -> requestCollect");
    let idEntreprise = req.params.id;
    console.log(idEntreprise);
    db_entreprise.requestCollect(idEntreprise).then(() => {
      res.json({ err: "", success: true, data: null });
    }
    );
  },

  // deleteEntrepriseById
  deleteEntrepriseById: (req, res) => {
    console.log("API -> deleteEntrepriseById");
    let idEntreprise = req.params.id;
    db_entreprise.deleteEntrepriseById(idEntreprise).then(() => {
      res.json({ err: "", success: true, data: null });
    }
    );
  },
  };
};
