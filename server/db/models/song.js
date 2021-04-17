let mongoose = require("mongoose")
let Schema = mongoose.Schema
let songSchema = new Schema({
  id: Number,
  data: Object,
  type: String
})

let songModel = new mongoose.model("songs", songSchema)

module.exports = songModel