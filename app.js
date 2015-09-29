var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var swig = require("swig");
require('./filters')(swig);

var app = express();

app.use(morgan('combined'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


app.use(require('./routes'));

// WHY DOESNT THIS WORK??
app.use(function(err, req, res, next){
	console.error("THIS IS AN ERROR", err.stack);
	res.render('error', err.stack);
	// next();
})


app.listen(3000);
