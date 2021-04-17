let mongoose = require("mongoose")
let Schema = mongoose.Schema
let playlistSchema = new Schema({
  id: Number,
  data: Object,
  type: String
})

let playlistModel = new mongoose.model("playlists", playlistSchema)

module.exports = playlistModel