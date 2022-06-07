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
    // getAllCollector
    getAllCollector: function (req, res) {
      console.log("API -> getAllCollector");
      db_collector.getAllCollector().then((collector) => {
        res.json({ err: "", success: true, data: collector });
      });
    },

    // getCollectorById
    getCollectorByIdUser: function (req, res) {
      console.log("API -> getCollectorById");
      db_collector.getCollectorByIdUser(req.params.id).then((collector) => {
        res.json({ err: "", success: true, data: collector });
      });
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
