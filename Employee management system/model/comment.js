const mongoose = require('mongoose');
 
 const commentSchema =  new mongoose.Schema({
     username: {type: String,required:false},
     message: {type: String,required: true },
     commentDate: {type: Date , default: Date.now  },
     task:{ type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true},
 }); 
 
 const Comment= mongoose.model("Comment", commentSchema); 
 module.exports = Comment;