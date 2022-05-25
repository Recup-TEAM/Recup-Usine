
module.exports = function (http, session, db) {
    const { body, validationResult } = require("express-validator");


    // Fonctions utilisables dans "./routes.js"
    return {
        // Connexion
        login: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            // On regarde dans la DB si l'email et le mot de passe existent
            db.getUser({ email, password }).then((user) => {
                if (user == false) {
                    // L'utilisateur n'existe pas
                    console.log("L'utilisateur", { email, password }, "n'existe pas");
                } else {
                    // L'utilisateur existe
                    const errors = validationResult(req);
                    if (!errors.isEmpty() || user == undefined) {
                        console.log(errors);
                    } else {
                        
                        req.session.email = user[0].email;
                        req.session.password = user[0].password;
                        req.session.compteLevel = user[0].compteLevel;
                        req.session.save();
                        console.log("L'utilisateur ", {email}, " s'est connecté ! (compte de level : ", { type: user[0].compteLevel }, ")");
                    }
                }
                res.redirect("/");
            });
        },


        // Inscription
        signup: (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            let compteLevel = 0; // Pas admin par défaut

            // On regarde dans la DB si l'email existe déjà
            db.getUser({ email, password }).then((user) => {

                if (user == false) { // L'utilisateur n'existe pas encore
                    dataUser = {email, password, compteLevel }
                    db.createUser(dataUser).then(() => {
                        req.session.email = email;
                        req.session.password = password;
                        req.session.compteLevel = compteLevel;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" vient de s'inscrire ! (compte de type : " + compteLevel + ")");
                        res.redirect("/");
                    });

                } else {
                    // L'utilisateur existe déjà
                    console.log("L'utilisateur \"" + email + '" existe déjà');
                    res.redirect("/");
                }
            });
        },

        

    };
};
