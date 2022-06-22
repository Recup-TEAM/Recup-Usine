const { json } = require("express");

module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_order = require("../database/db_order")();

  // Fonctions utilisables dans "./api_request.js"
  return {
    /***************
     *   Orders    *
     ***************/

    /* GET */
    // Get all orders
    getAllOrders: (req, res) => {
      console.log("API -> getAllOrders");
      db_order.getAllOrders().then((orders) => {
        res.json({ err: "", success: true, data: orders });
      });
    },

    // Get order by id
    getOrderById: (req, res) => {
      console.log("API -> getOrderById");
      db_order.getOrderById(req.params.id).then((order) => {
        res.json({ err: "", success: true, data: order });
      });
    },

    // Get order by id user
    getOrderByIdUser: (req, res) => {
      console.log("API -> getOrderByIdUser");
      id = req.params.id
      jsonIntervalDates = req.query.jsonIntervalDates
      db_order.getOrderByIdUser(id, jsonIntervalDates).then((order) => {
        res.json({ err: "", success: true, data: order });
      });
    },


    /* POST */
    // Ajouter un order
    createOrderHistory: (req, res) => {
      console.log("API -> createOrderHistory");
      //check if user is connected
      if (check.checkUserConnected(req, res)) {
        let id_user = req.session.userId;
        let jsonOfProducts = req.body.jsonOfProducts;
        db_order.createOrderHistory(id_user, jsonOfProducts).then(() => {
          res.json({ err: "", success: true });
        });
      }
    },
  };
};
