let mongoose = require("mongoose")
let Schema = mongoose.Schema
let albumSchema = new Schema({
  data: Object,
  id: Number,
  type: String
})

let albumModel = new mongoose.model("albums", albumSchema)

module.exports = albumModel