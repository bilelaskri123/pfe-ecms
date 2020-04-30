
// GET /api/test/all
// GET /api/test/user for loggedin users (user/moderator/admin)
// GET /api/test/mod for moderator
// GET /api/test/admin for admin


const { authJwt } = require("../middleware");
const  controller = require("../controllers/user.controller");
const router = require('express').Router();
const db = require('../models');
const User = db.user;
const Role = db.role;

const multer = require('multer');
const PHOTO_PATH = 'profiles';

// var upload = multer({ dest : `${PHOTO_PATH}/`});

var storage = multer.diskStorage({
  destination : function(req, file, cb){
      cb(null, `${PHOTO_PATH}`)
  },
  filename : function(req, file, cb) {
      cb(null, file.originalname)
  },
  limits : {
    fieldSize: 2 * 1024 * 1024 // 2 MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    // allow images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image are allowed.'), false);
    }
    cb(null, true);
}
});

var upload = multer({storage : storage});

router.put('/photo/:id', upload.single('photo') , async(req, res) => {
  try {
    const photo = req.file;
    // console.log(photo);
    if (!photo) {
      res.status(400).send({
        status : false,
        data : 'No file is selected.'
      });
    }else {

      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        if (user) {

          console.log(user);
          user.updateOne({image : photo.originalname }, (err) => {
            if (err) {
              res.status(500).send(err);
            }
            res.json({
              message : 'photo updated with success',
              yourImage : photo.originalname
            })
          })
        }
      })
      // res.send({
      //   status : true,
      //   message : 'File is uploaded.',
      //   data : {
      //     name : photo.originalname,
      //     mimetype : photo.mimetype,
      //     size : photo.size/1024
      //   }
      // });
    }
  }catch(err) {
    res.status(500).send(err);
  }
});  



router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// router.post('/photo', controller.updateProfilePhoto);


router.get(
  "/all",
  // [authJwt.verifyToken, authJwt.isRh],
  controller.getAllUsers
);

router.get(
  "/userId",
  // [authJwt.verifyToken, authJwt.isAdmin],
  controller.getUserById
);


router.delete("/delete/:id", 
  controller.deleteUser
);

router.get('/role', 
  controller.getUserByRole
);

router.get('/user', 
 	controller.getUserByName
);

module.exports = router;
