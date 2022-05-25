module.exports = function (app, session, db) {
    const apiFunction = require("./apiFunction")(session, db);

    const bodyParser = require("body-parser");
    const { body, validationResult } = require("express-validator");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    // Connexion
    app.post("/login", urlencodedParser, apiFunction.login);

    // Inscription
    app.post("/signup", urlencodedParser, apiFunction.signup);

    // Get le level du compte
    app.get("/api/get/compteLevel", urlencodedParser, apiFunction.getCompteLevel);

    // Update le level d'un compte
    app.post("/api/update/updateCompteLevel", urlencodedParser, apiFunction.updateCompteLevel);

    // Changer le mot de passe
    app.post("/api/update/changePassword", urlencodedParser, apiFunction.changePassword);

    // get all users
    app.get("/api/get/allUsers", urlencodedParser, apiFunction.getAllUsers);


    //temp for test
    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });


    
};
