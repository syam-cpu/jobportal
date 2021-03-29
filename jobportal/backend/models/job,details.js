const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	maxapplications: {
		type: String,
		required: true
    },
    maxpositions: {
        type:String,
        required:true
    },
	postdate:{
		type: Date,
		required: false
	},
	deadline:{
		type: Date,
		required: false
	},
	skillset:{
		type: Array,
		required: false
	},
	jobtype:{
		type: String,
		required: false
    },
    duration:{
        type: String,
        required:false
    },
    salary:{
        type: String,
        required:false
    },
    rating:{
        type:Array,
        required:false
    },
    recname:{
        type:String,
        required:false
    },
    recemail:{
        type:String,
        required:false
    },
    members:{
        type:Array,
        required:true
    },
    avg_rating:{
        type :String,
        required :false

    }


});

module.exports = User = mongoose.model("jobinfo", UserSchema);
