module.exports = function (app, session, db) {
    app.get("/api/get/compteLevel", (req, res) => {
        console.log("getCompteLevel");
        if (req.session.email) {
            res.json(req.session.compteLevel);
        }
        else {
            res.json(0);
        }
    });


    //temp for test
    app.get("/api/get/reservations/:salle", (req, res) => {
        const salle = req.params.salle;
        db.getReservations({ salle }).then((reservations) => {
            res.json(reservations);
        });
    });


    app.get("/api/post/", (req, res) => {
        data = req.query;
    });
};
