const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

// - Pour traiter l'authentification et l'autorisation, nous créons les fonctions suivantes:
// - vérifier si le token est fournie, légale ou non. Nous obtenons le jeton de x-access-token des en-têtes HTTP, 
//   puis utilisons la fonction de jsonwebtoken 
// - vérifiez si l'utilisateur contient le rôle requis ou non verify() roles


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; // récuperer token

  // verifier est ce que le token est valable ou non
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === "admin") {
          next();
          return;
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isStudent = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "student") {
          next();
          return;
        }

        res.status(403).send({ message: "Require student Role!" });
        return;
      }
    );
  });
};

isParent = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "parent") {
          next();
          return;
        }

        res.status(403).send({ message: "Require parent Role!" });
        return;
      }
    );
  });
};

isTrainer = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "trainer") {
          next();
          return;
        }

        res.status(403).send({ message: "Require trainer Role!" });
        return;
      }
    );
  });
};

isRh = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "rh") {
          next();
          return;
        }

        res.status(403).send({ message: "Require rh Role!" });
        return;
      }
    );
  });
};


isProvider = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "provider") {
          next();
          return;
        }

        res.status(403).send({ message: "Require provider Role!" });
        return;
      }
    );
  });
};


isFinancial = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }


        if (role.name === "financial") {
          next();
          return;
        }

        res.status(403).send({ message: "Require financial Role!" });
        return;
      }
    );
  });
};


isBilbio = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === "biblio") {
          next();
          return;
        }

        res.status(403).send({ message: "Require biblio Role!" });
        return;
      }
    );
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isBilbio,
  isFinancial,
  isProvider,
  isRh,
  isStudent,
  isTrainer,
  isParent
};
module.exports = authJwt;