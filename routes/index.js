var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

module.exports = router;

router.get('/',function(req,res,next){
  if(req.session.username == 'admin'){
    res.redirect('/dashboard')
  }
  else{
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  }
})

router.post('/login',function(req,res,next) {
  // console.log('here');
  if(!req.body){
    res.send("Please send some data");
  }
//   else{
//     if(err){
//       res.send(err);
//     }
//     else {
//       if(req.body.password == 'pronoob17' && req.body.username == 'admin'){
//         res.redirect('/dashboard')
//       }
//       else {
//         res.send('Please try again!')
//       }
//     }
//   }
});

router.get('/dashboard',function (req, res, next){
    res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'));
  }
