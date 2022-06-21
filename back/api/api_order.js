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
      db_order.getOrderByIdUser(req.params.id).then((order) => {
        res.json({ err: "", success: true, data: order });
      });
    },
  };
};
