module.exports = function (app, session, db) {
    const apiFunction = require("./apiFunction")(session, db);

    const bodyParser = require("body-parser");
    const { body, validationResult } = require("express-validator");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    /***************
     *    User     *
     ***************/

    // Connexion
    app.post("/login", urlencodedParser, apiFunction.login);

    // Inscription
    app.post("/signup", urlencodedParser, apiFunction.signup);

    // Get le level du compte
    app.get("/api/get/compteLevel", urlencodedParser, apiFunction.getCompteLevel);

    // Update le level d'un compte (admin only)
    app.post("/api/update/updateCompteLevel", urlencodedParser, apiFunction.updateCompteLevel);

    // Changer le mot de passe
    app.post("/api/update/changePassword", urlencodedParser, apiFunction.changePassword);

    // Get all users (admin only)
    app.get("/api/get/allUsers", urlencodedParser, apiFunction.getAllUsers);



    /***************
     * Entreprise  *
     ***************/

    // Get all entreprises 
    app.get("/api/get/allEntreprises", urlencodedParser, apiFunction.getAllEntreprises);

    // Get tout les produits une entreprise
    app.get("/api/get/getAllProductsFrom/:id", urlencodedParser, apiFunction.getAllProducts);

    // Get tout les produits
    app.get("/api/get/getAllProducts", urlencodedParser, apiFunction.getAllProducts);

    // Get un produit par son id
    app.get("/api/get/getProduct/:id", urlencodedParser, apiFunction.getProductById);


    
};
