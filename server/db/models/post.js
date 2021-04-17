let mongoose = require("mongoose")
let Schema = mongoose.Schema
let postSchema = new Schema({
  id: Number,
  userId: Number,
  text: String,
  shareInfo: Object,
  creator: Object,
  imgs: Array,
  date: Number,
  like: Number,
  comment: Number
})

let postModel = new mongoose.model("posts", postSchema)

module.exports = postModel