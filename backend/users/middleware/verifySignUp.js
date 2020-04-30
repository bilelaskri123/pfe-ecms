const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Pour vérifier une action d'inscription, nous avons besoin de 2 fonctions:
// - vérifier les doublons username et email
// - vérifier si la roles demande est légale ou non


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

// middleware pour verifier si les roles choisis existe ou non dans le tableau role
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
      if (!ROLES.includes(req.body.role)) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;