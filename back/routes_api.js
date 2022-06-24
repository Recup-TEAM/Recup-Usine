module.exports = function (app, session) {
    const api_user = require("./api/api_user")(session);
    const api_entreprise = require("./api/api_entreprise")(session);
    const api_product = require("./api/api_product")(session);
    const api_collector = require("./api/api_collector")(session);
    const api_order = require("./api/api_order")(session);

    const bodyParser = require("body-parser");
    const { body, validationResult } = require("express-validator");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    /***************
     *    User     *
     ***************/
    
    /* GET */
    // Get if user is connected
    app.get("/api/user/get/connected", urlencodedParser, api_user.getConnected);

    // Get data of current user
    app.get("/api/user/get/data", urlencodedParser, api_user.getUserData);

    // Get user by id
    app.get("/api/user/get/userById/:id", urlencodedParser, api_user.getUserById);

    // Get le level du compte
    app.get("/api/user/get/compteLevel", urlencodedParser, api_user.getCompteLevel);
    
    // Get all users (admin only)
    app.get("/api/user/get/allUsers", urlencodedParser, api_user.getAllUsers);

    // Get current subscription of user
    app.get("/api/user/get/subscription", urlencodedParser, api_user.getSubscription);

    // Get subscription of user by id
    app.get("/api/user/get/subscriptionById/:id", urlencodedParser, api_user.getSubscriptionById);

    // update subscription price of user
    app.post("/api/user/change/subscriptionPrice/", urlencodedParser, api_user.changeSubscriptionPrice);

    // Update subscription duration
    app.post("/api/user/change/subscriptionDuration/", urlencodedParser, api_user.changeSubscriptionDuration);
    
    
    /* POST */
    // Connexion
    app.post("/api/user/login", urlencodedParser, api_user.login);

    // Deconnexion
    app.post("/api/user/logout", urlencodedParser, api_user.logout);

    // Inscription
    app.post("/api/user/signup", urlencodedParser, api_user.signup);

    // Changer le mot de passe
    app.post("/api/user/update/changePassword", urlencodedParser, api_user.changePassword);

    // Reset password
    app.post("/api/user/update/resetPassword", urlencodedParser, api_user.resetPassword);
    
    // Changer le mail
    app.post("/api/user/update/changeMail", urlencodedParser, api_user.changeEmail);

    // Update le level d'un compte (admin only)
    app.post("/api/user/update/updateCompteLevel", urlencodedParser, api_user.updateCompteLevel);

    // Subscribe to a plan
    app.post("/api/user/update/subscribe", urlencodedParser, api_user.subscribe);

    // Upload image
    app.post("/api/user/update/uploadImage", urlencodedParser, api_user.uploadAvatar);




    /***************
     * Entreprise  *
     ***************/

    /* GET */
    // Get data entreprise of the current user
    app.get("/api/entreprise/get/data", urlencodedParser, api_entreprise.getEntreprisetDataOfCurrentUser);

    // Get all entreprises 
    app.get("/api/entreprises/get/allEntreprises", urlencodedParser, api_entreprise.getAllEntreprises);

    // Get entreprise by id
    app.get("/api/entreprises/get/entrepriseById/:id", urlencodedParser, api_entreprise.getEntrepriseById);
    
    // Get all entreprises by user
    app.get("/api/entreprises/get/allEntreprisesByUser/:id", urlencodedParser, api_entreprise.getAllEntreprisesByUser);

    // Accept an entreprise
    app.get("/api/entreprises/accept/:id", urlencodedParser, api_entreprise.acceptRecupartenaire);



    /* POST */
    // Ajouter une entreprise
    app.post("/api/entreprises/add", urlencodedParser, api_entreprise.addEntreprise);

    // Request a collect
    app.post("/api/collector/request/collect/:id", urlencodedParser, api_entreprise.requestCollect);

    // Delete an entreprise (/api/entreprises/delete/entrepriseById/:id)
    app.post("/api/entreprises/delete/entrepriseById/:id", urlencodedParser, api_entreprise.deleteEntrepriseById);


    /***************
     *   Product   *
     ***************/

    /* GET */
    // Get tout les produits une entreprise
    app.get("/api/products/get/allProductsFrom/:id", urlencodedParser, api_product.getAllProductsFrom);

    // Get tout les produits
    app.get("/api/products/get/allProducts", urlencodedParser, api_product.getAllProducts);

    // Get un produit par son id
    app.get("/api/products/get/productId/:id", urlencodedParser, api_product.getProductById);

    // Get user of product
    app.get("/api/products/get/userOfProduct/:id", urlencodedParser, api_product.getUserOfProduct);


    /* POST */
    // Ajouter un produit
    app.post("/api/products/add", urlencodedParser, api_product.addProduct);

    // delete a product by id
    app.post("/api/products/delete/:id", urlencodedParser, api_product.deleteProduct);

    // Update quantity of a product
    app.post("/api/products/update/quantity", urlencodedParser, api_product.updateQuantity);




    /***************
     *  Collector  *
     ***************/

    /* GET */
    // Get all collector
    app.get("/api/collector/get/all", urlencodedParser, api_collector.getAllCollector);

    // Get collector by id user
    app.get("/api/collector/get/collectorByIdUser/:id", urlencodedParser, api_collector.getCollectorByIdUser);
    
    // Get collector by id
    app.get("/api/collector/get/collectorById/:id", urlencodedParser, api_collector.getCollectorById);

    // Get all entreprise who need a collect
    app.get("/api/collector/get/allEntrepriseWhoNeedCollect", urlencodedParser, api_collector.getAllEntrepriseWhoNeedCollect);

    // Get itinary of a collector by id collector
    app.get("/api/collector/get/getItinaryByCollectorId/:id", urlencodedParser, api_collector.getItinaryByCollectorId);


    /* POST */
    // Create a collector demande
    app.post("/api/collector/add", urlencodedParser, api_collector.createDemande);

    // Update a collector demande
    app.post("/api/collector/update/:id", urlencodedParser, api_collector.updateCollectorDemande);

    // Delete a collector by id
    app.post("/api/collector/delete/:id", urlencodedParser, api_collector.deleteCollector);




    /***************
     *   Orders    *
    ***************/

    /* GET */
    // Get all orders
    app.get("/api/orders/get/all", urlencodedParser, api_order.getAllOrders);

    // Get order by id
    app.get("/api/orders/get/orderById/:id", urlencodedParser, api_order.getOrderById);

    // Get order by id user
    app.get("/api/orders/get/orderByIdUser/:id", urlencodedParser, api_order.getOrderByIdUser);


    /* POST */
    // Create an order
    app.post("/api/orders/add/orderHistory/", urlencodedParser, api_order.createOrderHistory);

};
