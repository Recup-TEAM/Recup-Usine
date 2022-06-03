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
    const mail = require("./routes_mail")(app, session);
    
    //const routeFolders = {}

    // Config des dossiers de fichiers front
    app.use(express.static(path.join(__dirname, "../front")));

    // Redirection acceuil
    app.get("/", (req, res) => {
        //if (!req.session.email) { res.sendFile(path.join(__dirname, "../front/html/login.html"));}    
        res.sendFile(path.join(__dirname, "../front/html/index.html"));
    });
  
    //create automatic redirection from name to front/html/name.html
    app.get("/:folder/:name", (req, res) => {
        // if name is not a html file, redirect to index

        if (req.params.name.indexOf(".html") === -1 && req.params.name.split(".").length > 1) {
            res.redirect("/");
        } else {
        
        res.sendFile(path.join(__dirname, "../front/html/" + req.params.folder + "/" + req.params.name + ".html"));
        
        }
    });

};