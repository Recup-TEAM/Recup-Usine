module.exports = function () {
  const db_query = require("../db_config")().db_query;

  return {
    /***************
     *   Orders   *
     ***************/

    /* GET */
    // Get all orders
    getAllOrders: async () => {
      let sql = "SELECT * FROM orderHistory";
      var rq = await db_query(sql);
      return rq;             
    },
    // Get order by id
    getOrderById: async (id) => {
      let sql = "SELECT * FROM orderHistory WHERE id = ?";
      var rq = await db_query(sql, [id]);
      return rq;
    },

    // Get order by id user
    getOrderByIdUser: async (id, jsonIntervalDates) => {
      let sql = "SELECT * FROM orderHistory WHERE id_user = ?  and Date between ? and ?";
      var rq = await db_query(sql, [id, jsonIntervalDates.startDate, jsonIntervalDates.endDate]);
      return rq;
    }
  };
};
