var express = require('express');
var router = express.Router();

var database=[];

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.post('/like/:var1/:var2',function(req,res){
	  var var1=req.params.var1;
	  var var2=req.params.var2;
		if (var1=='omar') {
			database.push({var1:var1,var2:var2});
			var responseObject={message:"hey "+var1+" i like "+var2};
			res.send(responseObject);
		}else {
			res.status(400).send();
		}

});

router.get('/likes',function(req,res){
	// query strings in express (http://localhost:3000/likes?search=count) #emad
	var search = req.query.search;
	if (database.length == 0) {
		if (search && search=="count") {
			var responseObject={count:0};
			res.status(404).send(responseObject);
		}
	}else{
		if (search && search=="count") {
			var responseObject=database;
			res.send(responseObject);
		}
	}

});

module.exports = router;
