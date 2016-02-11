var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/users");

var userSchema= mongoose.Schema({
    name:String,
    password:String
});

var userModel=mongoose.model('user',userSchema);

router.get('/',function(req,res){
  res.send("hello there");
});


router.post('/save/:name/:password',function(req,res){
        var name=req.params.name;
        var password=req.params.password;
       var newuser = new userModel();
       newuser.name = name;
       newuser.password = password;
       newuser.save(function(err,savedObj){
          if (err) {
            console.log(err);
            res.status(500).send();
          }else {
            res.send(savedObj);
          }
     });
});

router.get('/all',function(req,res){
  userModel.find({},function(err,resdata){
    if (err) {
      console.log(err);
      res.status(500).send();
    }else {
      if (resdata.length == 0) {
        res.status(404).send();
      }else {
        // res.render('test',{resdata:resdata,title:"Test"});
        // res.send(data);
        res.json(resdata);
      }
    }
  });
});

router.put('/update/:id',function(req,res){
  var id = req.params.id;
  userModel.findOne({_id:id},function(err,object){
    if (err) {
      console.log(err);
      res.status(500).send();
    }else {
      if (!object) {
        res.status(404).send();
      }else {
          if (req.body.name) {
            object.name=req.body.name;
          }

          if (req.body.password) {
              object.password=req.body.password;
          }

          object.save(function(err,updatedObject){
             if (err) {
               console.log(err);
               res.status(500).send();
             }else {
               res.send(updatedObject);
             }
          });
      }
    }

  });
});

module.exports = router;
