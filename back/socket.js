const md5 = require("md5");

module.exports = function (http, session, db) {
    const io = require("socket.io")(http);
    const sharedsession = require("express-socket.io-session");
    const { body, validationResult } = require("express-validator");
    //config session
    io.use(sharedsession(session, { autoSave: true }));

    io.on("connection", (socket) => {

        /*socket.on("createReservation", ({ salle, annee, mois, jour, horaire }) => {
                db.getReservations({ salle, annee, mois, jour, horaire }).then((reservations) => {
                    if (reservations.length == 0) {
                        db.createReservation({
                            salle: salle,
                            annee: annee,
                            mois: mois,
                            jour: jour,
                            horaire: horaire,
                            prenom: socket.handshake.session.prenom,
                            nom: socket.handshake.session.nom,
                        })
                            .then((reservation) => {
                                io.emit("reservationCreated", reservation);
                            })
                            .catch((err) => {
                                socket.emit("reservationError", err);
                            });
                    }
            });
        });*/

        socket.on("getUser", (userName) => {
            db.getUsers(userName)
                .then((result) => {
                    console.log(result);
                    socket.emit("respUser", result);
                })
                .catch((err) => {
                    socket.emit("Error", err);
                });
        });


        socket.on("getIsAdmin", () => {
            socket.emit("isAdmin", socket.handshake.session.admin)
        });
 


        socket.on("disconnect", () => {
            // L'utilisateur ferme la page
        });

        socket.on("leave", () => {
            console.log("L'utilisateur \"" + socket.handshake.session.email + "\" s'est deconnecté !");
            delete socket.handshake.session.email;
            socket.handshake.session.save();
        });


        socket.on("askToken", () => {
            if (socket.handshake.session.admin) {
                console.log(socket.handshake.session.email + socket.handshake.session.password);
                console.log(md5(socket.handshake.session.email + socket.handshake.session.password));
                socket.emit("getToken", md5(socket.handshake.session.email + socket.handshake.session.password));
            }
        });

 
    });

    // Fonctions utilisables dans "./routes.js"
    return {
        // Connexion
        login: (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            // TEMPORAIRE (pour les tests) :
            if (email === "admin" && password === "admin") {
                req.session.email = email;
                req.session.password = "admin";
                req.session.admin = true;
                req.session.save();
                console.log("L'utilisateur \"" + email + "\" s'est connecté !");
                res.redirect("/");
                return;
            }
            // FIN TEMPORAIRE


            // On regarde dans la DB si l'email et le mot de passe existent
            db.getUser({ email, password }).then((user) => {
                console.log("Log user : " + user);
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
                        req.session.admin = user[0].admin;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" s'est connecté !");
                    }
                }
                res.redirect("/");
            });
        },

        // Inscription
        signup: (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            let admin = false; // Pas admin par défaut

            console.log("mail : " +  email +  " pswd : " + password)
            // On regarde dans la DB si l'email existe déjà
            db.getUser({ email, password }).then((user) => {
                console.log("Log user : " + user);
                if (user.length != false) {
                    // L'utilisateur n'existe pas encore
                    db.createUser({email, password, admin }).then(() => {
                        req.session.email = email;
                        req.session.password = password;
                        req.session.admin = admin;
                        req.session.save();
                        console.log("L'utilisateur \"" + email + "\" vient de s'inscrire");
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
