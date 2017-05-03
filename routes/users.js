var express = require('express');
var router = express.Router();
var User = require('../models/User');
var router = express.Router();

module.exports = router;

// function authenticateUser(req,res,next){
//   if(req.session){
//     if(req.session.phone && req.session.name && req.session.password){
//       next()
//     }
//     else{
//       res.redirect('/')
//     }
//   }
//   else{
//     res.redirect('/')
//   }
// }

/* GET users listing. */
router.post('/login',function(req,res,next) {
  if(!newUser.body){
    res.send("Please send some data")
  }
  issueRegister.findone
  var newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password
  });
  newUser.save();
  console.log(newUser);
  // res.render('user-register');
});

router.get('/');
module.exports = router;
