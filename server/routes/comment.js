let express = require('express');
let router = express.Router();
const userModel = require("../db/models/user")
const commentModel = require("../db/models/comment")
const constant = require("../common/const")

router.post("/saveComment", function(req, res, next){
  const user = req.body.user
  const username = user.username
  const type = req.body.subInfo.type
  const workId = req.body.subInfo.id
  const content = req.body.content
  const queryUser = userModel.find({ username: username });
  const promiseUser = queryUser.exec();
  promiseUser.then(userValue => {
    if(userValue.length!==0){
      commentModel.create({ user, type, workId, content, time:Date.now(), likedCount: 0, }, function(err, doc) {
        if(err){
          res.json({data: {success: "false",reason:err}})
        }else{
          res.json({data: {success: "true",data:doc}})
        }
      })
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

router.get("/getComment", function(req, res, next){
  const type = req.query.type
  const id = req.query.id
  const query = commentModel.find({ workId: id, type });
  const promise = query.exec();
  promise.then(value=>{
    res.json({data:{success: "true", comments: value.reverse()}})
  },err=>{
    res.json({data:{success: "false"}})})
});

module.exports = router;