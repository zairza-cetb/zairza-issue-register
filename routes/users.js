var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = router;

router.post('/login',function(req,res,next) {
  console.log('here');
  if(!req.body){
    res.send("Please send some data");
  }
  else{
    User.findOne({phone: req.body.phone}, function(err, foundUser){
      if(err){
        res.send(err);
      }
      else {
        if(foundUser){
          res.send(foundUser)
        }
        else {
          var newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password
          });
          newUser.save(function (err, savedUser) {
            if(err){
              res.send(err)
            }
            else {
              res.send(savedUser)
            }
          });
        }
      }
    });
  }
});

module.exports = router;
