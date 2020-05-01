// There are 4 functions:
// – /api/test/all for public access
// – /api/test/user for loggedin users (any role)
// – /api/test/mod for moderator users
// – /api/test/admin for admin users

const db = require("../models");
const User = db.user;
const Role = db.role;

getAllUsers = (req,res) => {
  User.find({}, (err,users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        users : users
      })
    }
  })
}

getUserById = (req,res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  })
}

getUserByName = (req, res) => {
  User.find({username : req.body.username || req.query.username},(err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json(user)
    // console.table(typeof(user));
  } )
}

deleteUser = (req,res) => {
  User.findOneAndDelete({_id : req.params.id }, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('user deleted with success !');
    }
  })
}

getUserByRole = (req, res) => {
  
  var role = req.body.role || req.query.role ;
  console.log(role);
  var id;

  Role.find({name : role}, (err,data) => {
    if(err) {
      res.status(500).send(err);
    }

    id = data[0]._id;
    // console.log(id);
    // res.json(data);
    User.find({role : id}, (err, users) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message : `the list of the ${role}`,
        Data : users
      })
    });

  })
}


const userController = {
  // updateProfilePhoto,
  getAllUsers,
  deleteUser,
  getUserById,
  getUserByRole,
  getUserByName
}

module.exports = userController;


// var storage = multer.diskStorage({
//   destination : (req, file, cb) => {
//     cb(null, '../profiles');
//   },
//   filename : (req, file, cb) => {
//     console.log(file);
//     var filetype = '';
//     if(file.mimetype === 'image/png') {
//       filetype = 'png';
//     }
//     if(file.mimetype === 'image/jpeg') {
//       filetype = 'jpg'
//     }
//     cb(null, 'image-' + Date.now() + '.' + filetype);
//   }
// })