var express = require('express');

var router = express.Router();

var wiki = require('./wiki');

module.exports = router;

router.get("/", function(req, res, next){
	res.redirect("/wiki");
})

router.use("/wiki", wiki);

