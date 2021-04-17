let express = require('express');
let router = express.Router();
const playlistModel = require("../db/models/playlist")
const albumModel = require("../db/models/album")
const songModel = require("../db/models/song")
const artistModel = require("../db/models/artist")
const mvModel = require("../db/models/mv")

router.post("/saveData", function(req, res, next){
  const type = req.body.type
  const mediaData = req.body.mediaData
  switch (type) {
    case "playlist":
      saveData("playlist", playlistModel, mediaData.id, mediaData, res)
      break;
    case "album":
      saveData("album", albumModel, mediaData.album.id, mediaData, res)
      break;
    case "song":
      saveData("song", songModel, mediaData.id, mediaData, res)
      break;
    case "mv":
      saveData("mv", mvModel, mediaData.data.id, mediaData, res)
      break;
    case "artist":
      saveData("artist", artistModel, mediaData.id, mediaData, res)
      break;
    default:
      break;
  }
})

router.get("/mv", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    getData("mv", mvModel, ids, res)
  }
})

router.get("/album", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    getData("album", albumModel, ids, res)
  }
})

router.get("/artist", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    getData("artist", artistModel, ids, res)
  }
})

router.get("/playlist", function(req, res, next){
  const ids = req.query.ids
  if(ids.length === 0){
    res.json({data:{success:"false"}})
  }else{
    getData("playlist", playlistModel, ids, res)
  }
})

function saveData(type, model, newId, newData, res){
  const query = model.find({ id: newId });
  const promise = query.exec();
  promise.then(value=>{
    if(value.length === 0){
      model.create({ type: type, id: newId, data: newData }, function(err, doc) {
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          res.json({data:{success:"true"}})
        }
      })
    }else{
      model.updateOne({id: newId}, { $set: { data: newData }}, function(err,raw){
        if(err){
          res.json({data:{success:"false",reason:err}})
        }else{
          res.json({data:{success:"true"}})
        }
      })
    }
  },err=>{
    res.json({data:{success:"false",reason:err}})
  })
}

function getData(type, model, ids, res){
  let single = ids.indexOf(",")===-1
  if(single){
    const query = model.find({ id: ids });
    const promise = query.exec();
    promise.then(value=>{
      let data = {
        success: "true",
        [type+"s"]: [value[0].data]
      }
      res.json({data})
    },err=>{res.json({data:{success:"false",reason:err}})})
  }else{
    let idArr = ids.split(",")
    let mvArr = [], promiseArr = []
    idArr.forEach((element) => {
      const query = model.find({ id: element });
      const promise = query.exec();
      promiseArr.push(promise)
      promise.then(value=>{
        mvArr.push(value[0].data)
      },err=>{})
    });
    const promiseAll = Promise.all(promiseArr)
    promiseAll.then(()=>{
      let data = {
        success: "true",
        [type+"s"]: mvArr
      }
      res.json({data})
    },err=>{res.json({data:{success:"false",reason:err}})})
  }
}

module.exports = router;