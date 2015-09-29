var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

module.exports = router;

router.get("/", function(req, res, next){
	Page.find().then(function(data){
		res.render("index", {pages: data});
	})

	// res.send("wiki home page!!");
})

router.post("/", function(req, res, next){
	var page = new Page({
		title: req.body.title,
		content: req.body.content
	})

	console.log(page);

	page.save().then(function(page){
		console.log("PAGE CREATED!!")
		// res.json(page)
		res.redirect("/wiki/"+page.urlTitle);
	}).catch(next);

})

router.get("/add", function(req, res, next){
	res.render('addpage');
});

router.get("/:urlTitle", function(req, res, next){
	console.log(req.params);
	// res.send("we got to the page at "+req.params.urlTitle);

	Page.findOne({urlTitle: req.params.urlTitle}).exec()
	.then(function(data){
		// res.json(data);
		res.render("wikipage", data);
	}).catch(next);



})