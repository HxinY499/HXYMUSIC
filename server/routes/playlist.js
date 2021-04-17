let express = require('express');
let router = express.Router();
const userModel = require("../db/models/user")
const playlistModel = require("../db/models/playlist")
const songModel = require("../db/models/song")
const {dir} = require("../utils/index")
const constant = require("../common/const")
const path = require('path')
const fs = require('fs')

//创建歌单
router.post("/createPlaylist", function(req, res, next){
  const username = req.body.username
  const createName = req.body.name
  const queryUser = userModel.find({ username: username });
  const promiseUser = queryUser.exec();
  promiseUser.then(value=>{
    if(value.length!==0){
      let newId = parseInt(Date.now().toString().split('').reverse().join(''))
      let data ={
        creator: {
          avatarUrl: value[0].avatar,
          gender: value[0].gender,
          birthday: value[0].birthday,
          userId: value[0].id,
          nickname: value[0].nickname,
          description: value[0].description,
          city: value[0].residence
        },
        tracks: [],
        trackIds: [],
        updateFrequency: null,
        backgroundCoverId: 0,
        backgroundCoverUrl: null,
        titleImage: 0,
        titleImageUrl: null,
        englishTitle: null,
        opRecommend: false,
        description: "暂无描述",
        tags: [],
        newImported: false,
        coverImgId: 109951165474121408,
        specialType: 0,
        updateTime: Date.now(),
        coverImgUrl: "http://localhost:9002/static/images/playlist-cover/default_cover.jpg",
        trackCount: 0,
        privacy: 0,
        trackUpdateTime: Date.now(),
        trackNumberUpdateTime: Date.now(),
        status: 0,
        userId: value[0].id,
        createTime: Date.now(),
        highQuality: false,
        adType: 0,
        subscribedCount: 1,
        cloudTrackCount: 0,
        name: createName,
        id: newId,
        ordered: true,
        playCount: 0,
        shareCount: 0,
        commentCount: 0,
        type: 0
      }
      playlistModel.create({ id:newId, data, type:"playlist" }, function(err, doc) {
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          let newCreateArr;
          if(!!value[0].createPlaylists){
            newCreateArr = [...value[0].createPlaylists]
            newCreateArr.push(newId)
          }else{
            newCreateArr = [newId]
          }
          userModel.updateOne({username}, { $set: { createPlaylists:newCreateArr }}, function(err,raw){
            if(!err){
              const reQuery = userModel.find({ username });
              const rePromise = reQuery.exec();
              rePromise.then(reValue => {
                res.json({data:{success: "true",doc,user: reValue[0]}});
              }, err => {res.json({data: {success: "false",reason: err}});})
            }else{
              res.json({data: {success: "false",reason: err}});
            }
          })
          
        }
      })
    }else{
      res.json({data:{success:"false",reason: constant.NO_USER}})
    }
  }, err=>{
    res.json({data:{success:"false",reason:err}})
  })
})

//获取自己创建的歌单
router.get("/getCreatePlaylist", function(req, res, next){
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
            type: value[0].data.type,
            name: value[0].data.name,
            picUrl: value[0].data.coverImgUrl,
            trackNumberUpdateTime: value[0].data.trackNumberUpdateTime,
            playCount: value[0].data.playCount,
            trackCount: value[0].data.trackCount,
            hightQuality: value[0].data.hightQuality,
            tag: value[0].data.tags,
            creator: value[0].data.creator,
            description: value[0].data.description
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
              creator: value[0].data.creator,
              description: value[0].data.description
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


//删除歌单，有username则也删除该用户创建歌单数组中的歌单
router.post("/delete", function(req, res, next){
  const username = req.body.username
  const id = req.body.id
  if(username){deleteCreatePlaylist(username, id)}
  const queryOld = playlistModel.find({ id });
  const promiseOld = queryOld.exec();
  promiseOld.then(valueOld => {
    if(valueOld&&valueOld.length>0){
      const oldCover = valueOld[0].data.coverImgUrl
      if(oldCover.substring(51) !== "default_cover.jpg"){
        fs.unlink(path.join("./public/images/playlist-cover", oldCover.substring(51)), (err) => {
          if (err) {console.log("封面删除失败")} else {console.log("封面删除成功")}
        })
      }
      playlistModel.deleteOne({ id }, function (err) {
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          const reQuery = userModel.find({ username });
          const rePromise = reQuery.exec();
          rePromise.then(reValue => {
            res.json({data:{success: "true",user: reValue[0]}});
          }, err => {res.json({data: {success: "false",reason: err}});})
        }
      });
    }
  })
})


//编辑歌单信息
router.post("/edit", function(req, res, next){
  const username = req.body.username
  const id = req.body.playlist.id
  const name = req.body.playlist.name
  const description = req.body.playlist.description
  const tag = req.body.playlist.tags || []
  const query = playlistModel.find({ id });
  const promise = query.exec();
  promise.then(value=>{
    if(value&&value.length>0){
      let newData = {...value[0].data}
      newData.name = name
      newData.description = description
      newData.tags = tag
      newData.updateTime = Date.now()
      playlistModel.updateOne({id}, { $set: { data:newData }}, function(err,raw){
        if(err){
          res.json({data: {success: "false",reason: err}});
        }else{
          const reQuery = userModel.find({ username });
          const rePromise = reQuery.exec();
          rePromise.then(reValue => {
            res.json({data:{success: "true",user: reValue[0]}});
          }, err => {res.json({data: {success: "false",reason: err}});})
        }
      })
    }else{
      res.json({data: {success: "false"}});
    }
  },err=>{
    res.json({data: {success: "false",reason: err}});
  })
})

//修改歌单封面
router.post("/changeCover", dir("./public/images/playlist-cover").single('cover'), function(req, res, next){
  if (req.file){
    const id = req.body.id
    const username = req.body.username
    const newCover = "http://localhost:9002/static/images/playlist-cover/"+req.file.filename
    //删除旧封面后在上传新封面
    const queryOld = playlistModel.find({ id });
    const promiseOld = queryOld.exec();
    promiseOld.then(valueOld => {
      const oldCover = valueOld[0].data.coverImgUrl
      if(oldCover.substring(51) !== "default_cover.jpg"){
        fs.unlink(path.join("./public/images/playlist-cover", oldCover.substring(51)), (err) => {
          if (err) {console.log("旧封面删除失败")} else {console.log("旧封面删除成功")}
        })
      }
      let newData = {...valueOld[0].data}
      newData.coverImgUrl = newCover
      playlistModel.updateOne({id}, { $set: { data: newData }}, function(err,raw){
        if(err){
          res.json({
            data:{
              success: "false",
              reason: err
            }});
        }else{
          const query = userModel.find({ username });
          const promise = query.exec();
          promise.then(value => {
            res.json({data:{success: "true",user: value[0]}});
          }, err => {res.json({data: {success: "false",reason: err}});console.log(err);})
        }
      })
    }, err => {res.json({data: {success: "false",reason: err}});console.log(err);})
  }else{
    res.json({
      data:{
        success: "false",
        reason: "error"
      }
    });
  }
})

//将歌曲添加到歌单中
router.post("/songToPlaylist", function(req, res, next){
  const playlistId = parseInt(req.body.playlistId)
  const songId = parseInt(req.body.songId)
  const query = playlistModel.find({ id: playlistId });
  const promise = query.exec();
  promise.then(value=>{
    if(value&&value.length>0){
      if(value[0].data.trackIds.includes(songId)){
        res.json({data:{success:"false",reason:constant.ALREADY_EXIST}});
      }else{
        let newData = value[0].data
        const query = songModel.find({ id: songId });
        const promise = query.exec();
        promise.then(value=>{
          if(value&&value.length>0){
            let now = Date.now()
            newData.tracks.push(value[0].data)
            newData.trackCount += 1
            newData.trackIds.push(value[0].id)
            newData.updateTime = now
            newData.trackUpdateTime = now
            newData.trackNumberUpdateTime = now
            playlistModel.updateOne({id: playlistId}, { $set: { data:newData }}, function(err,raw){
              if(err){
                res.json({data:{success:"false",reason:err}});
              }else{
                res.json({data:{success:"true"}});
              }
            })
          }else{
            res.json({data:{success:"false",reason:"error"}});
          }
        },err=>{
          res.json({data:{success:"false",reason:err}});
        })
      }
    }else{
      res.json({data:{success:"false",reason:"error"}});
    }
  }, err=>{
    res.json({data:{success:"false",reason:err}});
  })
})

//删除创建的歌单
const deleteCreatePlaylist = (username, id) => {
  const queryUser = userModel.find({ username });
  const promiseUser = queryUser.exec();
  promiseUser.then(value => {
    if(value&&value.length>0){
      let newCreate = value[0].createPlaylists.filter(item => {
        if(item !== id){return true}
      })
      userModel.updateOne({username}, { $set: { createPlaylists:newCreate }}, function(err,raw){})
    }
  })
}

module.exports = router;