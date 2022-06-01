   module.exports = function (app, session) {
     const nodemailer = require("nodemailer");
     const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
             user: "",
             pass: "",
         },
     });
 
     app.post("/api/registerMail", (req, res) => {
         const mailOptions = {
             from: "",
             to: req.body.email,
             subject: "Récup'Usine : Bienvenue sur notre application",
             text: "Bonjour,\n\n" +
             "Merci de vous être inscrit sur notre application.\n" +
             "Vous pouvez désormais vous connecter à l'aide de votre email et de votre mot de passe.\n\n" +
             "Cordialement,\n" +
             "L'équipe de notre application.",
         };

 
         transporter.sendMail(mailOptions, (err, info) => {
             if (err) {
                 res.status(500).send("Error sending mail");
             } else {
                 res.status(200).send("Mail sent");
             }
         });
     });

        app.post("/api/resetPassword", (req, res) => {
            const mailOptions = {
                from: "",
                to: req.body.email,
                subject: "Récup'Usine : Réinitialisation de votre mot de passe",
                text: "Bonjour,\n\n" +
                "Vous recevez cet email car vous avez demandé la réinitialisation de votre mot de passe.\n" +
                "Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.\n\n" +
                "Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous ou copier/coller dans votre navigateur internet.\n\n" +
                "http://localhost:3000/reset/" + req.body.token + "\n\n" +
                "Cordialement,\n" +
                "L'équipe de notre application.",
            };
 
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(500).send("Error sending mail");
                } else {
                    res.status(200).send("Mail sent");
                }
            });
        });

 }
