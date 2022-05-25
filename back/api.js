module.exports = function (app, session, db) {
    const apiFunction = require("./apiFunction")(session, db);

    const bodyParser = require("body-parser");
    const { body, validationResult } = require("express-validator");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    /***************
     *    User     *
     ***************/
    
    /* GET */
    // Get le level du compte
    app.get("/api/user/get/compteLevel", urlencodedParser, apiFunction.getCompteLevel);
    
    // Get all users (admin only)
    app.get("/api/user/get/allUsers", urlencodedParser, apiFunction.getAllUsers);
    
    
    /* POST */
    // Connexion
    app.post("/user/login", urlencodedParser, apiFunction.login);

    // Inscription
    app.post("/user/signup", urlencodedParser, apiFunction.signup);

    // Update le level d'un compte (admin only)
    app.post("/api/user/update/updateCompteLevel", urlencodedParser, apiFunction.updateCompteLevel);

    // Changer le mot de passe
    app.post("/api/user/update/changePassword", urlencodedParser, apiFunction.changePassword);




    /***************
     * Entreprise  *
     ***************/

    /* GET */
    // Get all entreprises 
    app.get("/api/entreprises/get/allEntreprises", urlencodedParser, apiFunction.getAllEntreprises);

    // Get tout les produits une entreprise
    app.get("/api/products/get/allProductsFrom/:id", urlencodedParser, apiFunction.getAllProductsFrom);

    // Get tout les produits
    app.get("/api/products/get/allProducts", urlencodedParser, apiFunction.getAllProducts);

    // Get un produit par son id
    app.get("/api/products/get/productId/:id", urlencodedParser, apiFunction.getProductById);


    /* POST */
    // Ajouter une entreprise
    app.post("/api/entreprises/add", urlencodedParser, apiFunction.addEntreprise);

    // Ajouter un produit
    app.post("/api/products/add", urlencodedParser, apiFunction.addProduct);


    
};
