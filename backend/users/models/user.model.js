// modèle d'utilisateur en rélation avec le modèle role pour le vérifier a chaque fois 

/**
 * ! notion de jointure avec les roles 
 */

const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    confirmPassword : {
      type : String,
      required : true
    },
    role : 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      },
    image : {
      type : String,
      required : false,
      default : null
    },
    dateNaiss : {
      type : Date,
      required : false,
      default : '01/01/2000'
    }
  })
);

module.exports = User;