var express = require('express');
var router = express.Router();
var Url = require('../model/shorturl');
var shortid = require('shortid');


router.get('/shorturl', function (req, res, next) {
	Url.find({}).exec(function(err, url){
		res.render('short',{url : url});
	})
})

router.get('/:id', function (req, res, next) {
  Url.findOne({short : req.params.id})
  .exec(function (err,url){
  	// return res.render('list',{url:url})
  	var match = url.name.match(/^https:\/\/|http:\/\//)
  	if (match === null) {
  		// console.log('http://'+url.originalUrl);
  		res.redirect('http://'+url.name);
  	} else {
  		res.redirect(url.name);
  	}
  	
  });
});





router.post('/shorturl/short', function (req,res,next){
	
	var sid = shortid.generate();
	 console.log(sid);
	var data = {'name': req.body.actual, 'short': sid};
	 console.log(data)
	var url = new Url(data);
	url.save(function (err,result){
		console.log(result);
		if(err){
			return res.json({error: true, reason:err});
		}else{
		return res.json({error: false, obj : result });
	}
	}); 
});

module.exports = router;
