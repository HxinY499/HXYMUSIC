let express = require('express');
let router = express.Router();
// const userModel = require("../db/models/user")
const playlistModel = require("../db/models/playlist")
const albumModel = require("../db/models/album")
const songModel = require("../db/models/song")
const constant = require("../common/const")
const {isNull} = require("../utils")

router.get("/", function(req, res, next){
  let keywords = req.query.keywords
  if(isNull(keywords)){
    res.json({data: {success: false, reason: "请传入非空字符串"}})
  }else{
    keywords = keywords.trim()
    const querySong = songModel.find({});
    const promiseSong = querySong.exec();
    const queryPlaylist = playlistModel.find({});
    const promisePlaylist = queryPlaylist.exec();
    const queryAlbum = albumModel.find({});
    const promiseAlbum = queryAlbum.exec();
    const PromiseArr = [promiseSong, promisePlaylist, promiseAlbum]
    Promise.all(PromiseArr).then(res => {
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
    })
  }
})

module.exports = router;