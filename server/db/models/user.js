let mongoose = require("mongoose")
let Schema = mongoose.Schema
let userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  nickname: String,
  avatar: String,
  description: String,
  gender: Number,
  birthday: Number,
  residence: Array,
  passProtect: Object,
  likes: Object,
  createPlaylists: [],
  fans: [],
  posts: [],
  likePosts: [],
  registerTime: Number
})

let userModel = new mongoose.model("users", userSchema)
    // userModel.create({ username: "user2", password: "jay499" }, function(err, doc) {
    //     console.log(doc)
    // })
module.exports = userModel