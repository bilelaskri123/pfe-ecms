// Il existe 2 fonctions principales pour l'authentification:
// - signup: créer un nouvel utilisateur dans la base de données (le rôle est l' utilisateur s'il ne spécifie pas le rôle)
// - signin:

// recherche usernamede la requête dans la base de données, si elle existe
// comparer passwordavec passworddans la base de données en utilisant bcrypt , s'il est correct
// générer un jeton en utilisant jsonwebtoken
// renvoyer les informations utilisateur et le jeton d'accès

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8)
  });

  if (user.password = user.confirmPassword) {
    if (req.body.role) {
      Role.find({
        name: { $in: req.body.role }
      }, (err, role) => {
        if (err) {
          res.status(500).send(err);
        }

       if(role.length < 1) {
          res.send('role not existed');
       }else {
        user.role = role.map(role => role._id);
        user.save((err, user) => {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.json({
              message: 'signup with success !',
              data: user
            })
          }
        })
       }
      })
    } else {
      Role.find({name : "user"}, (err, role) => {
        if(err) {
          res.status(500).send(err);
        }

        user.role = role.map(role => role._id);

        user.save((err, user) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json({
              message : 'signup with success!',
              data : user
            })
          }
        })
      })
    }

  } else {
    res.send('password not equal a confirm password !')
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      

      var authority = '';

      Role.findById(user.role, (err, role) => {
        if(err) {
          console.log(err);
        }else {
          authority = role.name;
          res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            role: authority,
            accessToken: token
          });
          
        }
      })
    });
};

exports.verifyRole = (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      Role.find({_id : user.role}, (err, role) => {
        if (err) {
          res.status(500).send(err);
        }
        if (role) {
          res.send(role[0].name);
        }
      });
    }
  });
}