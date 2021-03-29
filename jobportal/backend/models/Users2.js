const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	education:{
		type:Array,
		required:true

	},
	skils:{
		type:Array,
		required:true
	},
	jobs_applied:{
		type:Array,
		required:true

	},
	rating:{
		type:Array,
		required:false
	},
	avg_rating:{
		type:String,
		required:false

	}

});

module.exports = User = mongoose.model("Applicant", UserSchema);
