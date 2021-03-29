const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	join_date: {
		type: Date,
		required: true
	},
	jobtype:{
		type: String,
		required: false
	},
	title:{
		type: String,
		required: true
    },
    person_email:{
        type : String,
        required:false
    },
    rec_email:{
        type : String,
        required : false 
    },
    job_id:{
        type:String,
        required: false
    }

	


});

module.exports = User = mongoose.model("accepted", UserSchema);
