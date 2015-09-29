var express = require('express');

var router = express.Router();

module.exports = router;

router.get("/", function(req, res, next){
	res.redirect("/");
})

router.post("/", function(req, res, next){
	console.log("post is running");
	res.json(req.body);
})

router.get("/add", function(req, res, next){
	res.render('addpage');
});