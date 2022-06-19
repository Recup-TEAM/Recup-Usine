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

    // getCollectorByIdUser
    getCollectorByIdUser: function (req, res) {
      console.log("API -> getCollectorById");
      db_collector.getCollectorByIdUser(req.params.id).then((collector) => {
        res.json({ err: "", success: true, data: collector });
      });
    },

    // getCollectorById
    getCollectorById: function (req, res) {
      console.log("API -> getCollectorById");
      db_collector.getCollectorById(req.params.id).then((collector) => {
        res.json({ err: "", success: true, data: collector });
      });
    },


    /* POST */
    //createDemande
    createDemande: function (req, res) {
      console.log("API -> createDemande");
      // get name, email and prenom from body
      //check if user connected
      if(check.checkUserAdmin(req, res)){
      let name = req.body.nom;
      let email = req.body.email;
      let prenom = req.body.prenom;
      let id_user = req.session.userId;
      db_collector.createDemande(name, email, prenom, id_user).then((result) => {
        res.json({ err: "", success: true, data: result });
      });
    }
    },

    // Update collector demande
    updateCollectorDemande: function (req, res) {
      console.log("API -> updateCollectorDemande");
      // get collector id from body
      //check if user is admin
      check.checkUserAdmin(req, res)
      let id = req.body.id;
      db_collector.updateCollectorDemande(id).then((result) => {
        res.json({ err: "", success: true, data: result });
      });
    },

    // Delete collector by id
    deleteCollector: function (req, res) {
      console.log("API -> deleteCollector");
      db_collector.deleteCollector(req.params.id).then((result) => {
        res.json({ err: "", success: true, data: result });
      });
    },
  };
};
