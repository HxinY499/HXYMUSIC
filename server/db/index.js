var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/hxymusic', { useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connection.once("open", function() {
    console.log("数据库已连接")
})
mongoose.connection.once("close", function() {
    console.log("数据库已断开连接")
})