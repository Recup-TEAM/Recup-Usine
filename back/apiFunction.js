


module.exports = function (session, db) {
    const { body, validationResult } = require("express-validator");
    //function check if user connected
    function checkUserConnected(req, res) {
        if (!req.session.email) {
            res.json({"err": "Vous n'êtes pas connecté !", "code": 0});
            return false
        }
        else {
            return true
        }
    }

    //function check if user is admin
    function checkUserAdmin(req, res) {
        //check if user is connected
        if (!checkUserConnected(req, res)) {
            return false
        }
        if (req.session.compteLevel!=0) {
            res.json({"err": "Vous n'êtes pas administrateur !", "code": 0});
            return false
        }
        else {
            return true
        }
    }


    // Fonctions utilisables dans "./routes.js"
    return {
        // Connexion
        login: (req, res) => {
            console.log("API -> login");
            const email = req.body.email;
            const password = req.body.password;

            // On regarde dans la DB si l'email et le mot de passe existent
            db.login({ email, password }).then((user) => {
                if (user == false) {
                    // L'utilisateur n'existe pas
                    console.log("L'utilisateur", { email, password }, "n'existe pas");
                    res.json({"err" : "L'utilisateur n'existe pas", "code" : 0});
                } else {
                    // L'utilisateur existe
                    const errors = validationResult(req);
                    if (!errors.isEmpty() || user == undefined) {
                        console.log(errors);
                        res.json({"err" : "Erreur de validation", "code" : 0});
                    } else {
                        
                        req.session.email = user[0].email;
                        req.session.password = user[0].password;
                        req.session.compteLevel = user[0].compteLevel;
                        req.session.save();
                        console.log("L'utilisateur ", {email}, " s'est connecté ! (compte level : ", { type: user[0].compteLevel }, ")");
                    }
                    res.json({"err": "", "code" : 1});
                }
            });
        },

        // Inscription
        signup: (req, res) => { // [0 = admin, 1 = user...]
            console.log("API -> signup");
            let email = req.body.email;
            let password = req.body.password;
            let compteLevel = 1; // Pas admin par défaut

            // On regarde dans la DB si l'email existe déjà
            db.getUser(email).then((user) => {

                if (user == false) { // L'utilisateur n'existe pas encore
                    dataUser = {email, password, compteLevel }
                    db.createUser(dataUser).then(() => {
                        req.session.email = email;
                        req.session.password = password;
                        req.session.compteLevel = compteLevel;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" vient de s'inscrire ! (compte level : " + compteLevel + ")");
                        res.json({"err" : "", "code": 1});
                    });

                } else {
                    // L'utilisateur existe déjà
                    console.log("L'utilisateur \"" + email + '" existe déjà');
                    res.json({"err" : "L'utilisateur \"" + email + '" existe déjà', "code": 0})
                }
            });
        },

        // GetcomteLevel
        getCompteLevel: (req, res) => {
            console.log("API -> getCompteLevel");
            if(checkUserConnected(req, res)) {
                res.json({"err": "", "code": 1, "data": {"compteLevel" : req.session.compteLevel}});
            }
            


        },

        // Changer le mot de passe
        changePassword: (req, res) => {
            console.log("API -> changePassword");
            let email = req.body.email;
            let password = req.body.password;
            let newPassword = req.body.newPassword;

            // On regarde dans la DB si l'email existe déjà
            db.getUser(email).then((user) => {

                if (user == false) { // L'utilisateur n'existe pas encore
                    console.log("L'utilisateur \"" + email + '" n\'existe pas');
                    res.json({"err" : "L'utilisateur n'existe pas", "code" : 0});
                } else {
                    // L'utilisateur existe déjà
                    dataUser = {email, password, newPassword }
                    db.updateUserPassword(dataUser).then(() => {
                        console.log("L'utilisateur \"" + email + '" a changé son mot de passe');
                        res.json({"err" : "", "code" : 1});
                    });
                }
            });
        },

        // Changer le level d'un compte (admin only)
        updateCompteLevel: (req, res) => {
            console.log("API -> updateCompteLevel");
            if(checkUserAdmin(req, res)) {
                let email = req.body.email;
                let compteLevel = req.body.compteLevel;

                //check if user existe
                db.getUser(email).then((user) => {
                    if (user == false) {
                        console.log("L'utilisateur \"" + email + '" n\'existe pas');
                        res.json({"err" : "L'utilisateur \"" + email + '" n\'existe pas', "code" : 0});
                    } else {
                        db.updateUSerLevel(email, compteLevel).then(() => {
                            console.log("L'utilisateur \"" + email + '" a changé son compte level');
                            res.json({"err" : "", "code" : 1});
                        });
                    }
                });
            }
        },

        // Get all users (admin only)
        getAllUsers: (req, res) => {
            console.log("API -> getAllUsers");
            if(checkUserAdmin(req, res)) {
                db.getAllUsers().then((users) => {
                    res.json({"err" : "", "code" : 1, "data" : users});
                });
            }
        },

    };
};
