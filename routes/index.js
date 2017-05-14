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
  if(req.session.admin == 'zairza'){
    res.redirect('/dashboard')
  }
  else{
    res.sendFile(path.resolve(__dirname + '/../public/login.html'));
  }
})

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

router.post('/returnitem',isloggedin,function (req, res, next){
  issue.findOneAndUpdate({_id: req.body._id}, {$set:{returned_by: req.body.returned_by, return_verified_by: req.body.return_verified_by, return_date: req.body.return_date, is_returned: true}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
});
  res.redirect('/dashboard');
});

router.post('/additem',isloggedin,function (req, res, next){
  var new_issue = new issue({
    item: req.body.item,
    issued_by: req.body.issued_by,
    phone: req.body.phone,
    quantity: req.body.quantity,
    issue_date: req.body.issue_date,
    issue_verified_by: req.body.issue_verified_by
  });
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
  console.log(req.session);
    issue.find({},function(err, foundIssues){
      if(err){
        console.log(err);
        res.send(err);
      }
      else{
        var retunedIssues = [];
        var currentIssues = [];
        for(var i=0;i<foundIssues.length;i++){
          if(foundIssues.is_returned == true){
            returnedIssues.push(foundIssues);
          }
          else{
            currentIssues.push(foundIssues);
          }
        }
        // console.log(foundIssues);
        res.render('dashboard',{retuned_issueList: foundIssues, current_issueList: currentIssues});
      }
  });
});

router.get('/logout',function (req, res, next){
    // req.body.username = null;
    // req.body.password = null;
    req.session.admin = null;
    res.redirect('/');
});
