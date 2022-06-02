module.exports = function (session) {
  const { body, validationResult } = require("express-validator");
  const check = require("./check")();
  const db_user = require("../database/db_user")();
  //const db_entreprise = require("../database/db_entreprise")(conn);
  //const db_product = require("../database/db_product")(conn);

  // Fonctions utilisables dans "./api_user.js"
  return {
    /***************
     *    User     *
     ***************/

    /* GET */
    // Get if user is connected
    getConnected: function (req, res) {
      if (req.session.email) {
        res.json({
          connected: true,
          email: req.session.email,
          level: req.session.level,
        });
      } else {
        res.json({
          connected: false,
        });
      }
    },

    // GetcomteLevel
    getCompteLevel: (req, res) => {
      console.log("API -> getCompteLevel");
      if (checkUserConnected(req, res)) {
        res.json({ err: "", success: true, data: { compteLevel: req.session.compteLevel } });
      }
    },

    // Get all users (admin only)
    getAllUsers: (req, res) => {
      console.log("API -> getAllUsers");
      if (check.checkUserAdmin(req, res)) {
        db_user.getAllUsers().then((users) => {
          res.json({ err: "", success: true, data: users });
        });
      }
    },

    // Get current subscription of user
    getSubscription: (req, res) => {
      console.log("API -> getSubscription");
      if (check.checkUserConnected(req, res)) {
        db_user.getSubscription(req.session.userId).then((data) => {
          res.json({ err: "", success: true, data: data });
        });
      }
    },

    /* POST */
    // Connexion
    login: (req, res) => {
      console.log("API -> login");
      const email = req.body.email;
      const password = req.body.password;

      // On regarde dans la DB si l'email et le mot de passe existent
      db_user.login({ email, password }).then((user) => {
        if (user == false) {
          // L'utilisateur n'existe pas
          console.log("L'utilisateur", { email, password }, "n'existe pas");
          res.json({ err: "L'utilisateur n'existe pas", success: false });
        } else {
          // L'utilisateur existe
          const errors = validationResult(req);
          if (!errors.isEmpty() || user == undefined) {
            console.log(errors);
            res.json({ err: "Erreur de validation", success: false });
          } else {
            req.session.email = user[0].email;
            req.session.password = user[0].password;
            req.session.compteLevel = user[0].compte_level;
            req.session.userId = user[0].id_user;
            req.session.save();
            console.log(
              "L'utilisateur ",
              { email },
              " s'est connecté ! (compte level : ",
              { type: user[0].compte_level },
              ")"
            );
          }
          res.json({ err: "", success: true });
        }
      });
    },

    // Deconnexion
    logout: (req, res) => {
        console.log("API -> logout");
        req.session.destroy();
        res.json({ err: "", success: true });
    },


    // Inscription
    signup: (req, res) => {
      // [0 = admin, 1 = user...]
      console.log("API -> signup");
      let email = req.body.email;
      let password = req.body.password;
      let compteLevel = 1; // Pas admin par défaut

      // On regarde dans la DB si l'email existe déjà
      db_user.getUser(email).then((user) => {
        if (user == false) {
          // L'utilisateur n'existe pas encore
          dataUser = { email, password, compteLevel };
          db_user.createUser(dataUser).then(() => {
            req.session.email = email;
            req.session.password = password;
            req.session.compteLevel = compteLevel;
            req.session.save();
            console.log(
              "L'utilisateur \"" +
                email +
                "\" vient de s'inscrire ! (compte level : " +
                compteLevel +
                ")"
            );
            res.json({ err: "", success: true });
          });
        } else {
          // L'utilisateur existe déjà
          console.log("L'utilisateur \"" + email + '" existe déjà');
          res.json({ err: "L'utilisateur \"" + email + '" existe déjà', success: false });
        }
      });
    },

    // Changer le mot de passe
    changePassword: (req, res) => {
      console.log("API -> changePassword");
      let email = req.body.email;
      let password = req.body.password;
      let newPassword = req.body.newPassword;

      // On regarde dans la DB si l'email existe déjà
      db_user.getUser(email).then((user) => {
        if (user == false) {
          // L'utilisateur n'existe pas encore
          console.log("L'utilisateur \"" + email + "\" n'existe pas");
          res.json({ err: "L'utilisateur n'existe pas", success: false });
        } else {
          // L'utilisateur existe déjà
          dataUser = { email, password, newPassword };
          db_user.updateUserPassword(dataUser).then(() => {
            console.log("L'utilisateur \"" + email + '" a changé son mot de passe');
            res.json({ err: "", success: true });
          });
        }
      });
    },

    // Changer le level d'un compte (admin only)
    updateCompteLevel: (req, res) => {
      console.log("API -> updateCompteLevel");
      if (check.checkUserAdmin(req, res)) {
        let email = req.body.email;
        let compteLevel = req.body.compteLevel;

        //check if user existe
        db_user.getUser(email).then((user) => {
          if (user == false) {
            console.log("L'utilisateur \"" + email + "\" n'existe pas");
            res.json({ err: "L'utilisateur \"" + email + "\" n'existe pas", success: false });
          } else {
            db_user.updateUSerLevel({ email, compteLevel }).then(() => {
              console.log("L'utilisateur \"" + email + '" a changé son compte level');
              res.json({ err: "", success: true });
            });
          }
        });
      }
    },

    // Subscription  (TODO : if already subscribed)
    subscribe: (req, res) => {
      console.log("API -> subscribe");
      if (check.checkUserConnected(req, res)) {
        let userId = req.session.userId;
        let subscriptionLevel = req.body.subscriptionLevel;

        db_user.subscribe({ userId, subscriptionLevel }).then(() => {
          console.log(
            "L'utilisateur \"" +
              userId +
              " ('" +
              req.session.email +
              "')" +
              "\" s'est abonné au niveau " +
              subscriptionLevel
          );
          res.json({ err: "", success: true });
        });
      }
    },
  };
};
