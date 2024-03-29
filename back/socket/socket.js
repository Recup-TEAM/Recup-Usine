const md5 = require("md5");

module.exports = function (http, session) {
    const io = require("socket.io")({http, allowEIO3: false});
    
    const sharedsession = require("express-socket.io-session");
    const { body, validationResult } = require("express-validator");
    
    //config session
    io.use(sharedsession(session, { autoSave: true }));

    io.on("connection", (socket) => {

        socket.on("disconnect", () => {
            // L'utilisateur ferme la page
            delete socket.handshake.session.email;
            socket.handshake.session.save();
        });

        socket.on("leave", () => {
            console.log("L'utilisateur \"" + socket.handshake.session.email + "\" s'est deconnecté !");
            delete socket.handshake.session.email;
            socket.handshake.session.save();
        });


        /*socket.on("askToken", () => {
            if (socket.handshake.session.admin) {
                console.log(socket.handshake.session.email + socket.handshake.session.password);
                console.log(md5(socket.handshake.session.email + socket.handshake.session.password));
                socket.emit("getToken", md5(socket.handshake.session.email + socket.handshake.session.password));
            }
        });*/

        // get email
        socket.on("getEmail", () => {
            if (socket.handshake.session.email) {
                socket.emit("getEmail", socket.handshake.session.email);
            }
            else {
                socket.emit("getEmail", false);
            }
        }
        );
 
    });

};
