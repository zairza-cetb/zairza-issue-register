var express = require('express');
var app = express();
var router = express.Router();
var admin = require('../models/admin');
var path = require('path');

module.exports = router;

var isloggedin = function(req,res,next) {
  if(req.session) {
    if(req.session.admin == 'zairza') {
      next();
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }

}

router.post('/login',function(req,res,next) {
  if(!req.body){
    res.send("Please send some data");
  }
  else{
    admin.findOne({'admin':req.body.username,'password':req.body.password},function(err,admin) {
      if(err) {
        console.log(err);
        res.redirect('/logout');
      }else {
        if(admin){
          req.session.admin = "zairza";
          res.redirect('/dashboard');
        }
        else{
          res.redirect('/');
        }
      }
    })
  }
});

router.get('/logout',function (req, res, next){
    req.session.admin = null;
    res.redirect('/');
});
