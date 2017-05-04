var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

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
          if(req.body.password == foundUser.password){
            req.session.name = foundUser.name;
            req.session.phone = foundUser.phone;
            res.redirect('/user/dashboard')
          }
          else {
            res.send('Wrong password!')
          }
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
              req.session.name = foundUser.name;
              req.session.phone = foundUser.phone;
              res.redirect('/user/dashboard')
            }
          });
        }
      }
    });
  }
});

router.get('/dashboard',function (req, res, next){
  if(req.session.phone){
    res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'));
  }
  else{
    res.redirect('/');
  }
})

module.exports = router;
