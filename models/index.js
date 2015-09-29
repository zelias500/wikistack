var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var invalid = /\W/g
var spaces = /\s/g
function urlFriendly (title) {
	if (typeof title !== 'undefined' && title !== "") {
		var result = title.replace(spaces, "_");
		return result.replace(invalid, "");		
	}
	else {
		return Math.random().toString(36).substring(2, 7);
	}
}

var statuses = ['open','closed']

var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	status: {type: String, enum: statuses}, 
	date: {type: Date, default: Date.now},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

pageSchema.virtual("route").get(function (){
	return "/wiki/"+this.urlTitle;
})

pageSchema.pre('validate', function(next){
	this.urlTitle = urlFriendly(this.title);
	next();
})

var userSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type: String, required:true, unique:true}
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};

