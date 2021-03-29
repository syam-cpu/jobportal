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
	contactnumber:{
		type: String,
		required: false
	},
	bio:{
		type: String,
		required: false
	}


});

module.exports = User = mongoose.model("recruiter", UserSchema);
