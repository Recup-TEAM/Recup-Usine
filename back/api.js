module.exports = function (app, session, db) {
    app.get("/api/get/reservations", (req, res) => {
        db.getReservations({}).then((reservations) => {
            res.json(reservations);
        });
    });

    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });


    app.get("/api/post/", (req, res) => {
        db.getTokens().then((tokens) => {
            if (tokens.includes(req.query.token)) {
                if (req.query.action === "create") {
                    let data = req.query;
                    if (
                        data.salle &&
                        data.annee &&
                        data.mois &&
                        data.jour &&
                        data.horraire &&
                        data.prenom &&
                        data.nom
                    ) {
                        db.createReservation(data).then((reservation) => {
                            res.json(reservation);
                        });
                    } else {
                        res.send("Erreur: Veuillez remplir tous les champs.");
                    }
                }
                else if (req.query.action === "delete") {
                    let data = req.query;
                    if (
                        data.salle &&
                        data.annee &&
                        data.mois &&
                        data.jour &&
                        data.horraire
                    ) {
                        db.cancelReservation(data).then((reservation) => {
                            res.json(reservation);
                        });
                    } else {
                        res.send("Erreur: Veuillez remplir tous les champs.");
                    }
                }
                else {
                    res.send("Erreur: Veuillez entrer une action valide.");
                }
            } else {
                res.send("Unauthorized");
            }
        });
    });
};
