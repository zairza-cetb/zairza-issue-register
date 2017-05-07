var express = require('express');
var app = express();
var router = express.Router();
var admin = require('../models/admin');
var issue = require('../models/issueList');
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

router.get('/',function(req,res,next){
  if(req.session.username == 'admin'){
    res.redirect('/dashboard')
  }
  else{
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  }
})

router.post('/login',isloggedin,function(req,res,next) {
  if(!req.body){
    res.send("Please send some data");
  }
  else{
    admin.findOne({'admin':req.body.admin,'password' : req.body.password},function(err,admin) {
      if(err) {
        console.log(err);
        res.redirect('/logout');
      }else {
        req.session.admin = "zairza";
        req.session.password = "pronoob17";
        res.redirect('/dashboard');
      }
    })
      // if(admin.findOne({'admin': req.body.admin, 'password': req.admin.password})){
      // req.session.admin = "zairza";
      // req.session.password = "pronoob17";
      // res.redirect('/dashboard');
      // }
      // else{
      //   res.send("Please try again!");
      //   res.redirect('/');
      // }
  }
});
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
//         res.redirect('/login');
//       }
//     }
//   }

// router.post('/returnitem',function (req, res, next){
//   if(req.session.username == 'admin'){
//     if(req.body.phone){
//       issueRegister.findByIdAndUpdate(req.body.phone, { $set: { returned_by: 'req.body.returned_by', is_returned: true },
//       {},{returne_date: req.body.returne_date},{return_verified_by: req.body.return_verified_by}},
//       { new: true }, function (err, issueRegister) {
//         if (err) return handleError(err);
//         res.send(issueRegister);
//       });
//     }
//     res.redirect('/dashboard');
//   }
//   else{
//     res.redirect('/')
//   }
// });

router.post('/additem',isloggedin,function (req, res, next){
  var new_issue = new issue({
    item: req.body.item,
    issued_by: req.body.issued_by,
    phone: req.body.phone,
    quantity: req.body.quantity,
    issue_date: req.body.issue_date,
    issue_verified_by: req.body.issue_verified_by
  });
  console.log(new_issue);
  new_issue.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/dashboard');
    }
  });
});

router.get('/dashboard',isloggedin,function (req, res, next){
    res.render('dashboard');
});

router.get('/logout',function (req, res, next){
    req.session.username = null;
    req.session.password = null;
    res.redirect('/');
});
