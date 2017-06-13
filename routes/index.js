var express = require('express');
var app = express();
var router = express.Router();
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

router.get('/dashboard',isloggedin,function (req, res, next){
    issue.find({is_returned : false},function(err, due_issues){
      if(err){
        console.log(err);
        res.send(err);
      }
      else{
        issue.find({is_returned : true},function(err, returned_issues){
          if(err){
            console.log(err);
          }
          else{
            res.render('dashboard',{issueList : due_issues, returnissues : returned_issues});
          }
      });
    }
  });
});

router.post('/returnitem',isloggedin,function (req, res, next){
  issue.findOneAndUpdate({_id: req.body.return_id}, {$set:{returned_by: req.body.returned_by, return_verified_by: req.body.return_verified_by, return_date: req.body.return_date, is_returned: true}}, {new: true}, function(err, doc){
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

router.post('/edititem', isloggedin, function(req,res,next){
  issue.findOne({_id : req.body.edit_id},function(err,id){
    if(err){
      console.log(err);
    }
    else {
      if(id){
        id.item = req.body.item;
        id.issued_by = req.body.issued_by;
        id.phone = req.body.phone;
        id.quantity = req.body.quantity;
        id.issue_date = req.body.issue_date;
        id.issue_verified_by = req.body.issue_verified_by;
        id.save(function(err){
          if (err){
            return handleError(err);
          }
          else{
            res.redirect('/dashboard');
          }
        });
      }
    }
  });
});

router.post('/deleteissue', isloggedin, function(req,res,next){
  issue.remove({_id : req.body.del_issue_id}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/dashboard');
  });
});
