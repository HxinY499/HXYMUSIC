let mongoose = require("mongoose")
let Schema = mongoose.Schema
let historySchema = new Schema({
  username: String,
  type: String,
  mediaArr: Array
})

let historyModel = new mongoose.model("histories", historySchema)

module.exports = historyModel