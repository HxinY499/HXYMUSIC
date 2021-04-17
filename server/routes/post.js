let express = require('express');
let router = express.Router();
const postModel = require("../db/models/post")
const userModel = require("../db/models/user")
const { randomId, dir, postCompare} = require("../utils/index")
const constant = require("../common/const")
const path = require('path')
const fs = require('fs')

//发布动态
router.post("/addPost", dir('./public/images/posts').array('posts'), function(req, res, next){
  const id = randomId();
  const text = req.body.text;
  const shareInfo = JSON.parse(req.body.shareInfo);
  const username = req.body.username;
  const files = req.files
  const query = userModel.find({ username });
  const promise = query.exec();
  promise.then(value=>{
    if(value&&value.length>0){
      let imgs = []
      let creator = {
        id: value[0].id,
        username: value[0].username,
        gender: value[0].gender,
        avatar: value[0].avatar,
        nickname: value[0].nickname
      }
      if(files&&files.length>0){
        files.forEach(file => {
          imgs.push("http://localhost:9002/static/images/posts/" + file.filename)
        })
      }
      postModel.create({ id, userId: creator.id, text, shareInfo, imgs, creator, date: Date.now(), like: 0, comment: 0 }, function(err, doc) {
        if(err){
          res.json({data:{success:"false",reason:err}});
        }else{
          let newPosts
          if(value[0].posts&&value[0].posts.length>0){
            newPosts = [...value[0].posts]
            newPosts.push(id)
          }else{
            newPosts = [id]
          }
          userModel.updateOne({username}, { $set: { posts: newPosts }}, function(err,raw){
            if(err){
              res.json({data:{success:"false",reason:err}});
            }else{
              const query = userModel.find({ username });
              const promise = query.exec();
              promise.then(value => {
                res.json({data:{success:"true",user: value[0]}});
              },err=>{res.json({data:{success:"false",reason:err}});})
            }
          })
        }
      })
    }else{
      res.json({data:{success:"false",reason:constant.NO_USER}});
    }
  }, err=>{ res.json({data:{success:"false",reason:err}}); })
})

//获取动态
router.get("/getPost", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    let single = ids.indexOf(",")===-1
    if(single){
      const query = postModel.find({ userId: ids });
      const promise = query.exec();
      promise.then(value => {
        if(value&&value.length>0){
          let postArr = [...value]
          postArr.sort(postCompare)
          res.json({data:{success:"true", posts: postArr}});
        }else{
          res.json({data:{success:"false", reason: constant.NO_DATA}});
        }
      }, err => {res.json({data:{success:"false", reason: err}});})
    }else{
      let idArr = ids.split(",")
      let postArr = [], promiseArr = []
      idArr.forEach((element) => {
        const query = postModel.find({ userId: element });
        const promise = query.exec();
        promiseArr.push(promise)
        promise.then(value=>{
          if(value&&value.length>0){
            postArr.push(...value)
          }else{}
        },err=>{})
      });
      const promiseAll = Promise.all(promiseArr)
      promiseAll.then(result=>{
        let posts = postArr.sort(postCompare)
        res.json({data: {success: "true",posts}})
      },err=>{res.json({data:{success:"false",reason:err}})})
    }
  }
})

//删除动态
router.post("/deletePost", function(req, res, next){
  const id = req.body.id
  const userId = req.body.userId
  let imgs = null
  const queryOld = postModel.find({ id });
  const promiseOld = queryOld.exec();
  promiseOld.then(value => {
    if(value&&value.length>0){
      imgs = value[0].imgs
      const queryUser = userModel.find({ id:userId });
      const promiseUser = queryUser.exec();
      promiseUser.then(valueUser => {
        if(valueUser&&valueUser.length>0){
          let newPostArr = valueUser[0].posts.filter(item => {
            if(item === id){return false}
            else{return true}
          })
          userModel.updateOne({id: userId}, { $set: { posts:newPostArr }}, function(err,raw){})
          postModel.deleteOne({ id }, function (err) {
            if(err){
              res.json({data:{success:"false",reason:err}})
            }else{
              imgs.forEach(item => {
                fs.unlink(path.join("./public/images/posts", item.substring(42)), (err) => {
                  if (err) {console.log("图片删除失败")} else {console.log("图片删除成功")}
                })
              })
              const reQuery = userModel.find({ id:userId });
              const rePromise = reQuery.exec();
              rePromise.then(reValue => {
                res.json({data:{success: "true",user: reValue[0]}});
              }, err => {res.json({data: {success: "false",reason: err}});})
            }
          });
        }else{
          res.json({data:{success:"false",reason:constant.NO_USER}});
        }
      })
    }else{
      res.json({data:{success:"false",reason:constant.NO_DATA}});
    }
  }, err => {res.json({data:{success:"false",reason: err}});})
})

//点赞动态
router.post("/likePost", function(req, res, next){
  const id = req.body.id
  const userId = req.body.userId
  let handleLike, ifHas
  const queryUser = userModel.find({ id:userId });
  const promiseUser = queryUser.exec();
  promiseUser.then(value=>{
    if(value&&value.length>0){
      let newLikePosts
      if(value[0].likePosts){
        ifHas = value[0].likePosts.includes(parseInt(id))
        if(ifHas){
          handleLike = -1
          newLikePosts = value[0].likePosts.filter(item => {
            if(item === id){return false}
            else{return true}
          })
        }else{
          handleLike = 1
          newLikePosts=[...value[0].likePosts]
          newLikePosts.push(id)
        }
      }else{
        ifHas = false
        handleLike = 1
        newLikePosts=[id]
      }
      userModel.updateOne({id:userId}, { $set: { likePosts:newLikePosts }}, function(err,raw){
        if(err){res.json({data:{success:"false"}});}
        else{
          const query = postModel.find({ id });
          const promise = query.exec();
          promise.then(value => {
            if(value&&value.length>0){
              let newLike = value[0].like+handleLike
              postModel.updateOne({id}, { $set: { like:newLike }}, function(err,raw){
                if(err){
                  res.json({data:{success:"false",reason: err}});
                }else{
                  const reQuery = userModel.find({ id:userId });
                  const rePromise = reQuery.exec();
                  rePromise.then(reValue => {
                    res.json({data:{success: "true",user: reValue[0]}});
                  }, err => {res.json({data: {success: "false",reason: err}});})
                }
              })
              
            }else{
              res.json({data:{success:"false",reason:constant.NO_DATA}});
            }
          }, err=>{res.json({data:{success:"false",reason: err}});})
        }
      })
    }else{
      res.json({data: {success: "false"}});
    }
  }, err=>{res.json({data: {success: "false"}});})

})

module.exports = router;
