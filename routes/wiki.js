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
		content: req.body.content,
		tags: req.body.tags.split(" ")
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

router.get("/search", function(req, res, next){
	if (!Object.keys(req.query).length) res.render('tagsearch');
	else {
		// console.log(req.query.tagSearch);
		// console.log(Page.findByTag(req.query.tagSearch));
		Page.findByTag(req.query.tagSearch).then(function(pages){
			console.log(pages);
			res.render('tagsearch', {pages: pages});
		})
		// console.log(tagged);
		// res.render('tagsearch', tagged);		
	}
})

router.get("/:urlTitle", function(req, res, next){
	console.log(req.params);
	// res.send("we got to the page at "+req.params.urlTitle);

	Page.findOne({urlTitle: req.params.urlTitle}).exec()
	.then(function(data){
		var thisPage = data;
		// thisPage.tags = thisPage.tags.join(" ");
		res.render("wikipage", thisPage);
	}).catch(next);



})