const express = require('express');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
let path = require('path');
const router = express.Router();

// Load Book signup
const Signup = require('../../models/Signup');


router.get('/test', (req, res) => res.send('Login route testing!'));

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

router.post('/create', (req, res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //TODO: restrictions on field
    let signup = new Signup(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      console.log(file.photo);

      signup.photo.data = fs.readFileSync(file.photo.path);
      signup.photo.contentType = file.photo.type;
    }
    //save to the DB
    signup.save((err, signup) => {
      if (err) {
        res.status(400).json({
          error: 'Error : Unable to create new account'
        });
      }
      res.json({ msg: 'Your account created successfully' });
      console.log(signup);
  });
  });
});
module.exports = router;