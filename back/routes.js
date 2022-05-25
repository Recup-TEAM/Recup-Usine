module.exports = function (express, app, http) {
    const session = require("express-session")({
        secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: false,
        },
    });
    app.use(session);
    const db = require("./database");
    const socket = require("./socket")(http, session, db);
    const conn = require("./connect")(http, session, db);

    const api = require("./api")(app, session, db);
    const path = require("path");
    const bodyParser = require("body-parser");
    const { body, validationResult } = require("express-validator");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // Config des dossiers de fichiers front
    app.use(express.static(path.join(__dirname, "../front")));

    // Redirection acceuil
    app.get("/", (req, res) => {
        if (!req.session.email) {
            // Utilisateur non connecté
            res.sendFile(path.join(__dirname, "../front/html/login.html"));
        } else {
            // Utilisateur connecté
            res.sendFile(path.join(__dirname, "../front/html/index.html"));
        }
    });




    // Connexion
    app.post("/login", urlencodedParser, conn.login);

    // Inscription
    app.post("/signup", urlencodedParser, conn.signup);

};
