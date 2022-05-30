module.exports = function (session, conn) {
    const { body, validationResult } = require("express-validator");
    const check = require("./check")();
    const db_product = require("../database/db_product");
    //const db_user = require("../database/db_user")(conn);
    //const db_entreprise = require("../database/db_entreprise")(conn);

    return {
        /***************
         *   Product    *
         ***************/

        /* GET */
        // Get tout les produits
        getAllProducts: (req, res) => {
            console.log("API -> getAllProducts");
            db_product.getAllProducts().then((products) => {
                res.json({"err" : "", "code" : 1, "data" : products});
            });
        },

        // Get un produit par son id
        getProductById: (req, res) => {
            console.log("API -> getProductById");
            let productId = req.params.id;
            db_product.getProductById(productId).then((product) => {
                res.json({"err" : "", "code" : 1, "data" : product});
            });
        },

        // Get user of a product
        getUserOfProduct: (req, res) => {
            console.log("API -> getUserOfProduct");
            let productId = req.params.id;
            db_product.getUserOfProduct(productId).then((user) => {
                res.json({"err" : "", "code" : 1, "data" : user});
            });
        },

        // Get tout les produits d'une entreprise
        getAllProductsFrom: (req, res) => {
            console.log("API -> getAllProductsFrom");
            let entrepriseId = req.params.id;
            db_product.getAllProductsFrom(entrepriseId).then((products) => {
                res.json({"err" : "", "code" : 1, "data" : products});
            });
        },
        

       /* POST */
        // Ajouter un produit
        addProduct: (req, res) => {
            console.log("API -> addProduct");
            //check if user is connected
            if(check.checkUserConnected(req, res)) {

                let entrepriseId = req.query.entrepriseId;
                let description = req.query.description;
                let price = req.query.price;
                //let productImage = req.body.productImage;

                db_product.addProduct({entrepriseId, description, price}).then(() => {
                    res.json({"err" : "", "code" : 1});
                });
            }
        },

    };
};
