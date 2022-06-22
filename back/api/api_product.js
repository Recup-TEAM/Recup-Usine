module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_product = require("../database/db_product")();

  return {
    /***************
     *   Product    *
     ***************/

    /* GET */
    // Get tout les produits
    getAllProducts: (req, res) => {
      console.log("API -> getAllProducts");
      db_product.getAllProducts().then((products) => {
        res.json({ err: "", success: true, data: products });
      });
    },

    // Get un produit par son id
    getProductById: (req, res) => {
      console.log("API -> getProductById");
      let productId = req.params.id;
      db_product.getProductById(productId).then((product) => {
        res.json({ err: "", success: true, data: product });
      });
    },

    // Get user of a product
    getUserOfProduct: (req, res) => {
      console.log("API -> getUserOfProduct");
      let productId = req.params.id;
      db_product.getUserOfProduct(productId).then((user) => {
        res.json({ err: "", success: true, data: user });
      });
    },

    // Get tout les produits d'une entreprise
    getAllProductsFrom: (req, res) => {
      console.log("API -> getAllProductsFrom");
      let entrepriseId = req.params.id;
      db_product.getAllProductsFrom(entrepriseId).then((products) => {
        res.json({ err: "", success: true, data: products });
      });
    },

    /* POST */
    // Ajouter un produit
    addProduct: (req, res) => {
      console.log("API -> addProduct");
      //check if user is connected
      if (check.checkUserConnected(req, res)) {
        let entrepriseId = req.query.entrepriseId;
        let description = req.query.description;
        let price = req.query.price;
        //let productImage = req.body.productImage;

        db_product.addProduct({ entrepriseId, description, price }).then(() => {
          res.json({ err: "", success: true });
        });
      }
    },

    // Delete un produit par son id
    deleteProduct: (req, res) => {
      console.log("API -> deleteProduct");
      //check if user is connected
      if (check.checkUserConnected(req, res)) {
        let productId = req.params.id;
        console.log(productId);

        db_product.deleteProduct(productId).then(() => {
          res.json({ err: "", success: true });
        });
      }
    },

    // updateQuantity of a product
    updateQuantity: (req, res) => {
      console.log("API -> updateQuantity");
      //check if user is connected
      if (check.checkUserConnected(req, res)) {
        let id_product =  req.body.id;
        let quantity = req.body.quantity;
        db_product.updateQuantity({ id_product, quantity }).then(() => {
          res.json({ err: "", success: true });
        }
        );
      }
    },
  };
};
