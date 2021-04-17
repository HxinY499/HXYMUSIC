let express = require('express');
let router = express.Router();
const userModel = require("../db/models/user")
const playlistModel = require("../db/models/playlist")
const albumModel = require("../db/models/album")
const constant = require("../common/const")

router.post("/setLikes", function(req, res, next){
  const username = req.body.username
  const likeId = parseInt(req.body.id)
  const likeType = req.body.type
  let thisId
  const queryUser = userModel.find({ username: username });
  const promiseUser = queryUser.exec();
  promiseUser.then(value=>{
    if(value.length!==0){
      thisId = value[0].id
      let newLikeObj = {}, newArr = []
      if(value[0].likes){
        if(value[0].likes[likeType]){
          newLikeObj = value[0].likes
          newArr = [...newLikeObj[likeType]]
          //已存在则为取消收藏
          let has = newArr.some(item => {return item === likeId})
          has ? newArr.splice(newArr.indexOf(likeId), 1) : newArr.push(likeId)
          newLikeObj[likeType] = newArr
        }else{
          newLikeObj = value[0].likes
          newLikeObj[likeType] = [likeId]
        }
      }else{
        newLikeObj = {[likeType]: [likeId]}
      }
      userModel.updateOne({username: username}, { $set: { likes: newLikeObj }}, function(err,raw){
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          if(likeType==="user"){
            const queryFans = userModel.find({ id: likeId });
            const promiseFans = queryFans.exec();
            promiseFans.then(value=>{
              if(value&&value.length>0){
                let newFans
                if(value[0].fans){
                  newFans = [...value[0].fans]
                  if(value[0].fans&&value[0].fans.length>0){
                    let has = newFans.some(item => {return item === thisId})
                    has ? newFans.splice(newFans.indexOf(thisId), 1) : newFans.push(thisId)
                  }else{
                    newFans = [thisId]
                  }
                }else{
                  newFans = [thisId]
                }
                userModel.updateOne({id: likeId}, { $set: { fans: newFans }}, function(err,raw){})
              }
            })
          }
          const query = userModel.find({ username: username });
          const promise = query.exec();
          promise.then(value => {
            res.json({data:{success: "true",user: value[0]}});
          }, err => {res.json({data: {success: "false",reason: err}});})
        }
      })
    }else{
      res.json({data:{success:"false",reason: constant.NO_USER}})
    }
  }, err=>{
    res.json({data:{success:"false",reason:err}})
  })
})

//注：获取喜欢的歌手、MV、歌曲与data中定义的获取数据一样，这里不重复定义
router.get("/likePlaylist", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    let single = ids.indexOf(",")===-1
    if(single){
      const query = playlistModel.find({ id: ids });
      const promise = query.exec();
      promise.then(value=>{
        if(value&&value.length>0){
          let mediaData = {
            id: value[0].data.id,
            type: 0,
            name: value[0].data.name,
            picUrl: value[0].data.coverImgUrl,
            trackNumberUpdateTime: value[0].data.trackNumberUpdateTime,
            playCount: value[0].data.playCount,
            trackCount: value[0].data.trackCount,
            hightQuality: value[0].data.hightQuality,
            tag: value[0].data.tags,
            creator: value[0].data.creator
          }
          let data = {
            success: "true",
            playlists: [mediaData]
          }
          res.json({data})
        }else{
          res.json({data:{success:"false",reason:err}})
        }
      },err=>{res.json({data:{success:"false",reason:err}})})
    }else{
      let idArr = ids.split(",")
      let mvArr = [], promiseArr = []
      idArr.forEach((element) => {
        const query = playlistModel.find({ id: element });
        const promise = query.exec();
        promiseArr.push(promise)
        promise.then(value=>{
          if(value&&value.length>0){
            let mediaData = {
              id: value[0].data.id,
              type: 0,
              name: value[0].data.name,
              picUrl: value[0].data.coverImgUrl,
              trackNumberUpdateTime: value[0].data.trackNumberUpdateTime,
              playCount: value[0].data.playCount,
              trackCount: value[0].data.trackCount,
              hightQuality: value[0].data.hightQuality,
              tag: value[0].data.tags,
              creator: value[0].data.creator
            }
            mvArr.push(mediaData)
          }
        },err=>{})
      });
      const promiseAll = Promise.all(promiseArr)
      promiseAll.then(()=>{
        let data = {
          success: "true",
          playlists: mvArr
        }
        res.json({data})
      },err=>{res.json({data:{success:"false",reason:err}})})
    }
  }
})

router.get("/likeAlbum", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    let single = ids.indexOf(",")===-1
    if(single){
      const query = albumModel.find({ id: ids });
      const promise = query.exec();
      promise.then(value=>{
        let mediaData = {...value[0].data.album}
        mediaData.description = ""
        let data = {
          success: "true",
          albums: [mediaData]
        }
        res.json({data})
      },err=>{res.json({data:{success:"false",reason:err}})})
    }else{
      let idArr = ids.split(",")
      let mvArr = [], promiseArr = []
      idArr.forEach((element) => {
        const query = albumModel.find({ id: element });
        const promise = query.exec();
        promiseArr.push(promise)
        promise.then(value=>{
          let mediaData = {...value[0].data.album}
          mediaData.description = ""
          mvArr.push(mediaData)
        },err=>{})
      });
      const promiseAll = Promise.all(promiseArr)
      promiseAll.then(()=>{
        let data = {
          success: "true",
          albums: mvArr
        }
        res.json({data})
      },err=>{res.json({data:{success:"false",reason:err}})})
    }
  }
})

router.post("/deleteLikes", function(req, res, next){
  const type = req.body.type
  const username = req.body.username
  const id = req.body.id
  const query = userModel.find({ username });
  const promise = query.exec();
  promise.then(value=>{
    if(value&&value.length>0){
      let likeArr = value[0].likes[type].filter(item => {
        if(item !== id){return true}
      })
      let likeObj = {...value[0].likes}
      likeObj[type] = likeArr
      userModel.updateOne({ username }, { $set: { likes: likeObj }}, function(err,raw){
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          const query = userModel.find({ username });
          const promise = query.exec();
          promise.then(value=>{
            if(value&&value.length>0){
              res.json({data:{success:"true",user:value[0]}})
            }
          }, err=>{res.json({data:{success:"false",reason:err}})})
        }
      })
    }
  })
})

module.exports = router;