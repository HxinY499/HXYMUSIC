let mongoose = require("mongoose")
let Schema = mongoose.Schema
let artistSchema = new Schema({
  data: Object,
  id: Number,
  type: String
})

let artistModel = new mongoose.model("artists", artistSchema)

module.exports = artistModel