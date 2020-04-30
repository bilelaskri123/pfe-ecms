const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

// initialiser les ROLES 

db.ROLES = ["user", "admin", "student", "parent", "rh", "trainer", "provider", "financial" , "biblio"];

module.exports = db;