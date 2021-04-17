let express = require('express');
let router = express.Router();
const userModel = require("../db/models/user")
const historyModel = require("../db/models/history")
const constant = require("../common/const")

//生成历史记录
router.post("/saveHistory", function(req, res, next){
  const type = req.body.type
  const username = req.body.user
  const mediaData = req.body.mediaData
  mediaData.minePlayCount = 1
  const queryUser = userModel.find({ username: username });
  const promiseUser = queryUser.exec();
  promiseUser.then(userValue => {
    if(userValue.length!==0){
      if(type === "song"){
        handleHistory(res, username, mediaData, type)
      }else if(type === "album"){
        handleHistory(res, username, mediaData, type)
      }else if(type === "playlist"){
        handleHistory(res, username, mediaData, type)
      }else if(type === "mv"){
        handleHistory(res, username, mediaData, type)
      }else{
        res.json({
          data:{
            success: "false",
            reason: "传入了不支持的媒体类型"
        }})
      }
    }else{
      res.json({
        data:{
          success: "false",
          reason: constant.NO_USER
      }})
    }
  },err => {
    res.json({
      data:{
        success: "false",
        reason: constant.NO_USER
    }})
  })
});

//获取历史记录
router.get("/getHistory", function(req, res, next){
  const username = req.query.username
  const query = historyModel.find({ username });
  const promise = query.exec();
  promise.then(value => {
    if(value&&value.length>0){
      let history = {}
      value.forEach(element => {
        history[element.type] = element
      });
      res.json({data:{success:"true", history}})
    }else{
      res.json({data:{success:"false"}});
    }
  }, err => {res.json({data:{success:"false"}});})
})

function handleHistory(res, username, mediaData, type) {
  const query = historyModel.find({ username: username, type: type });
  const promise = query.exec();
  promise.then(value => {
    if(value.length!==0){
      let hasIndex
      let ifHas = value[0].mediaArr.some((item, index) => {
        if(item.id === mediaData.id){hasIndex = index;return true}
        else{return false}
      })
      if(ifHas){
        let arr = [...value[0].mediaArr]
        arr[hasIndex].minePlayCount += 1
        arr[hasIndex].times.push(Date.now())
        historyModel.updateOne({username: username,type:type}, { $set: { mediaArr:arr }}, function(err,raw){
          res.json({data:{success:"true"}})
        })
      }else{
        let arr = [...value[0].mediaArr]
        mediaData.times = [Date.now()]
        arr.push(mediaData)
        historyModel.updateOne({username: username,type:type}, { $set: { mediaArr:arr }}, function(err,raw){
          res.json({data:{success:"true"}})
        })
      }
    }else{
      mediaData.times = [Date.now()]
      let newMediaArr = [mediaData]
      historyModel.create({ username, type, mediaArr:newMediaArr }, function(err, doc) {
        if(err){
          res.json({data: {success: "false",reason:err}})
        }else{
          res.json({data: {success: "true",data:doc}})
        }
      })
    }
  },err=>{res.json({data:{success:"false",reasul: err}})})
}

module.exports = router;