let mongoose = require("mongoose")
let Schema = mongoose.Schema
let mvSchema = new Schema({
  data: Object,
  id: Number,
  type: String
})

let mvModel = new mongoose.model("mvs", mvSchema)

module.exports = mvModel