let mongoose = require("mongoose")
let Schema = mongoose.Schema
let chatSchema = new Schema({
  id: Number,
  user: Object,
  content: Array
})

let chatModel = new mongoose.model("artists", chatSchema)

module.exports = chatModel