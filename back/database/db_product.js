module.exports = function () {
  const db_query = require("../db_config")().db_query;
  return {
    /***************
     *   Product   *
     ***************/

    /* GET */
    // Get tout les produits
    getAllProducts: async () => {
      let sql = "SELECT * FROM product";
      var rq = await db_query(sql);
      return rq;
    },

    // Get un produit
    getProductById: async (id) => {
      let sql = "SELECT * FROM product WHERE id_product='" + id + "'";
      var rq = await db_query(sql);
      return rq;
    },

    // Get user of a product (TODO : test)
    getUserOfProduct: async (id) => {
      let sql = "SELECT * FROM product WHERE id_product='" + id + "'";
      var rq = await db_query(sql);
      return rq;
    },

    // Get tout les produits une entreprise
    getAllProductsFrom: async (id) => {
      let sql = "SELECT * FROM product WHERE id_entreprise='" + id + "'";
      var rq = await db_query(sql);
      return rq;
    },

    /* POST */
    // Ajouter un produit
    addProduct: async (dataProduct) => {
      let sql =
        "INSERT INTO `product` (`id_product`, `id_entreprise`, `price`, `description`)" +
        "VALUES (NULL, '" +
        dataProduct.entrepriseId +
        "', '" +
        dataProduct.price +
        "', '" +
        dataProduct.description +
        "');";

      var rq = await db_query(sql);
      return rq;
    },

    // Delete un produit par son id
    deleteProduct: async (id) => {
      let sql = "DELETE FROM `product` WHERE `product`.`id_product` = " + id + ";";
      var rq = await db_query(sql);
      return rq;
    },
  };
};
