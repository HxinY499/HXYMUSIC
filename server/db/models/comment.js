let mongoose = require("mongoose")
let Schema = mongoose.Schema
let commentSchema = new Schema({
  user: Object,
  type: String,
  workId: Number,
  content: String,
  time: Number,
  likedCount: Number
})

let commentModel = new mongoose.model("comments", commentSchema)

module.exports = commentModel