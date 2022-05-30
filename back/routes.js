module.exports = function (express, app, http) {
    const session = require("express-session")({
        secret: "eb8fcc253281389225b4f787ca542f2336918ddc7f689e1fc41b64d5c4f378cdc438",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: false,
        },
    });
    app.use(session);
    const path = require("path");
    const conn = require("./db_config");
    const socket = require("./socket/socket")(http, session);
    const api = require("./routes_api")(app, session);

    // get db_query
    /*const db_query  = require("./db_config")().db_query;;
    setInterval(async function () {
        await db_query('SELECT 1');
    }, 5000);*/

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

    // Login
    app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, "../front/html/login.html"));
    });


};
