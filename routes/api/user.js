const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const router = express.Router();
const Signup = require('../../models/Signup');

router.post('/', (req, res) => {
  const { useremail, userpassword } = req.body;
  Signup.findOne({ useremail })
    .then(user => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
      else {
        if (userpassword === user.userpassword) {
          const sessUser = { username: user.username, useremail: user.useremail };

          res.status(200).json(user.id);
        }
        else {
          res.status(400).json("Incorrect Password");
        }
      }
    })
    .catch(err => res.status(400).json({ error: "No record found" }));
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

router.route('/create').post(upload.single('photo'), (req, res) => {

        const username = req.body.username;
        const useremail = req.body.useremail;
        const userpassword =req.body.userpassword
        const photo = req.file.filename;
    
        const profileData = {
            username,
            useremail,
            userpassword,
            photo
        }
    
        const profile = new Signup(profileData);
    
        profile.save()
           .then(() => res.json('Your account created successfully'))
           .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;