var express = require('express');
var app = express();
var router = express.Router();
var admin = require('../models/admin');
var issue = require('../models/issueList');
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
  if(!req.body){
    res.send("Please send some data");
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

router.post('/returnitem',function (req, res, next){
  if(req.session.username == 'admin'){
    if(req.body.phone){
      return_issue update = new issue(
        "$set", new issue()
                .append("returned_by", req.body.returned_by)
                .append("is_returned", true)
                .append("returne_date", req.body.returne_date)
                .append("return_verified_by", req.body.return_verified_by)
      )
    }
  res.redirect('/logout');
  }
  else{
    res.redirect('/')
  }
});

router.post('/additem',function (req, res, next){
  if(req.session.username == 'admin'){
    var new_issue = new issue({
      item: req.body.item,
      issued_by: req.body.issued_by,
      phone: req.body.phone,
      quantity: req.body.quantity,
      issue_date: req.body.issue_date,
      issue_verified_by: req.body.issue_verified_by
    });
    new_issue.save();
    db.collection.insert(new_issue);
    res.redirect('/dashboard');
  }o
  else{
    res.redirect('/')
  }
});

router.get('/dashboard',function (req, res, next){
    res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'));
});

router.get('/logout',function (req, res, next){
    res.redirect('/');
});
