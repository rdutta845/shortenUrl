
var mongoose = require('mongoose');
var shortid = require('shortid');

var urlschema = new mongoose.Schema({

	name : {

		type : String, 
	},

	short : {
		type : String,
		unique : true,
	}
});

module.exports = mongoose.model('Url', urlschema);
