let express = require('express');
let router = express.Router();
const userModel = require("../db/models/user")
const commentModel = require("../db/models/comment")
const historyModel = require("../db/models/history")
const {randomString,randomId, dir, getDiffDate} = require("../utils/index")
const constant = require("../common/const")
const path = require('path')
const fs = require('fs')

//修改头像
router.post("/changeAva", dir("./public/images/avatar").single('avatar'), function(req, res, next){
  if (req.file){
    const id = req.body.id
    const newAvatar = "http://localhost:9002/static/images/avatar/"+req.file.filename

    //删除旧头像后再上传新头像
    const queryOld = userModel.find({ id: id });
    const promiseOld = queryOld.exec();
    promiseOld.then(valueOld => {
      const oldAvatar = valueOld[0].avatar
      if(oldAvatar.substring(43) !== "default_avatar.jpg"){
        fs.unlink(path.join("./public/images/avatar", oldAvatar.substring(43)), (err) => {
          if (err) {console.log("旧头像删除失败")} else {console.log("旧头像删除成功")}
        })
      }
      userModel.updateOne({id: id}, { $set: { avatar: newAvatar }}, function(err,raw){
        if(err){
          res.json({
            data:{
              success: "false",
              reason: err
            }});
        }else{
          const query = userModel.find({ id: id });
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
});

//注册
router.post('/register', function(req, res, next) {
  const id = randomId();
  const username = req.body.user.email;
  const password = req.body.user.password
  const nickname = randomString(18)
  const registerTime = Date.now()
  const avatar = "http://localhost:9002/static/images/avatar/default_avatar.jpg"
  const query = userModel.find({ username: username });
  const promise = query.exec();
  promise.then(value => {
    if(value.length !== 0){
      res.json({
        data: {
          success: "false",
          reason: constant.ALREADY_EXIST
        }
      })
    }else{
      userModel.create({ id, username, password, nickname, avatar, registerTime }, function(err, doc) {
        if(err){
          console.log(err)
          res.json({data: {success: "false"}})
        }else{
          res.json({data: {success: "true"}})
        }
      })
    }
  }, err => {res.json({data: {success: "false",reason: err}});})
});

//登录
router.post('/login', function(req, res, next) {
  const username = req.body.user.username;
  const password = req.body.user.password
  const query = userModel.find({ username: username });
  const promise = query.exec();
  promise.then(value => {
    if(value.length === 0){
      res.json({
        data: {
          success: "false",
          reason: constant.NO_USER
        }
      })
    }else{
      if(value[0].password === password){
        res.json({
          data: {
            success: "true",
            user: value[0]
          }
        })
      }else{
        res.json({
          data: {
            success: "false",
            reason: constant.PASSWORD_ERR
          }
        })
      }
    }
  }, err => {res.json({data: {success: "false",reason: err}});console.log(err)})
});

//基本设置
router.post("/basic", function(req, res, next){
  const id = req.body.user.id;
  const nickname = req.body.user.nickname;
  const description = req.body.user.description;
  const gender = parseInt(req.body.user.gender ? req.body.user.gender : -1);
  const birthday = Date.parse(req.body.user.birthday) ? Date.parse(req.body.user.birthday) : Date.now();
  const residence = req.body.user.residence;
  userModel.updateOne({id: id}, { $set: { nickname, description, gender, birthday, residence }}, function(err,raw){
    if(err){
      res.json({data: {success: "false",reason: err}})
    }else{
      const query = userModel.find({ id: id });
      const promise = query.exec();
      promise.then(value => {
        res.json({data:{success: "true",user: value[0]}});
      }, err => {res.json({data: {success: "false",reason: err}});console.log(err);})
    }
  })
});

//设置、检验密保
router.post('/setPassProtect', function(req, res, next) {
  const question = req.body.question;
  const anser = req.body.anser
  const passProtect = {question, anser}
  const id = req.body.id
  const type = req.body.type
  if(type === "set"){
    userModel.updateOne({id: id}, { $set: { passProtect }}, function(err,raw){
      if(err){
        res.json({data: {success: "false",reason: err}})
      }else{
        console.log("更新密保成功")
        const query = userModel.find({ id: id });
        const promise = query.exec();
        promise.then(value => {
          res.json({data:{success: "true",user: value[0]}});
        }, err => {res.json({data: {success: "false",reason: err}});console.log(err);})
      }
    })
  }else if(type === "check"){
    const query = userModel.find({ passProtect: passProtect });
    const promise = query.exec();
    promise.then(value => {
      if(value.length>0){
        res.json({data: {success: "true",value: value[0]}})
      }else{
        res.json({data: {success: "false",reason: constant.PASS_PROTECT_WRONG}})
      }
    }, err => {
      res.json({data: {success: "false",reason: constant.PASS_PROTECT_WRONG}})
    })
  }else{
    res.json({data: {success: "false",reason: "没有可执行的类型"}})
  }
});

//修改密码
router.post('/checkPass', function(req, res, next) {
  const id = req.body.id;
  const password = req.body.password;
  userModel.updateOne({id: id}, { $set: { password }}, function(err,raw){
    if(err){
      res.json({data: {success: "false",reason: err}})
    }else{
      console.log("修改密码成功")
      const query = userModel.find({ id: id });
      const promise = query.exec();
      promise.then(value => {
        res.json({data:{success: "true",user: value[0]}});
      }, err => {res.json({data: {success: "false",reason: err}});console.log(err);})
    }
  })
});

//获取用户信息
router.get('/getUser', function(req, res, next){
  const id = req.query.id
  if(id.length === 0){
    res.json({data:{success:"false",reason:"error"}})
  }else{
    let single = id.indexOf(",")===-1
    if(single){
      const query = userModel.find({ id });
      const promise = query.exec();
      promise.then(value => {
        if(value&&value.length>0){
          let user = {
            id: value[0].id,
            residence: value[0].residence,
            username: value[0].username,
            nickname: value[0].nickname,
            avatar: value[0].avatar,
            birthday: value[0].birthday,
            description: value[0].description,
            gender: value[0].gender,
            likes: value[0].likes,
            createPlaylists: value[0].createPlaylists,
            fans: (value[0].fans)||[],
            posts: (value[0].posts)||[]
          }
          res.json({data: {success: "true",users: [user] }});
        }else{
          res.json({data: {success: "false",reason: constant.NO_USER}});
        }
      }, err => {
        res.json({data: {success: "false",reason: err}});
      })
    }else{
      let idArr = id.split(",")
      let mvArr = [], promiseArr = []
      idArr.forEach((element) => {
        const query = userModel.find({ id: element });
        const promise = query.exec();
        promiseArr.push(promise)
        promise.then(value=>{
          if(value&&value.length>0){
            let user = {
              id: value[0].id,
              residence: value[0].residence,
              username: value[0].username,
              nickname: value[0].nickname,
              avatar: value[0].avatar,
              birthday: value[0].birthday,
              description: value[0].description,
              gender: value[0].gender,
              likes: value[0].likes,
              createPlaylists: value[0].createPlaylists,
              fans: (value[0].fans)||[],
              posts: (value[0].posts)||[]
            }
            mvArr.push(user)
          }
        },err=>{})
      });
      const promiseAll = Promise.all(promiseArr)
      promiseAll.then(()=>{
        let data = {
          success: "true",
          users: mvArr
        }
        res.json({data})
      },err=>{res.json({data:{success:"false",reason:err}})})
    }
  }
})

//获取用户音乐数据
router.get("/getUserData", function(req, res, next){
  const username = req.query.username
  let userData = {}
  let arrSonger = []
  let arrPlaylist = []
  userData.times = []
  const queryUser = userModel.find({ username });
  const promiseUser = queryUser.exec();
  promiseUser.then(value => {
    if(value&&value.length>0){
      userData.registerTime = getDiffDate(value[0].registerTime)
      userData.likes = value[0].likes
      userData.fans = value[0].fans
      userData.posts = value[0].posts
      userData.likePosts = value[0].likePosts
      userData.createPlaylists = value[0].createPlaylists
      const query = historyModel.find({ username });
      const promise = query.exec();
      promise.then(value => {
        if(value&&value.length>0){
          value.forEach(element => {
            userData[element.type] = []
            element.mediaArr.forEach(item=>{
              userData[element.type].push({
                id : item.id,
                name : (item.name) || (item.data&&item.data.name),
                playCount : item.minePlayCount,
                times : item.times
              })
              if(element.type === "song"){
                if(item.ar&&item.ar.length>0){
                  arrSonger.push({id:item.ar[0].id,name:item.ar[0].name})
                }
                if(item.times){
                  userData.times.push(...item.times)
                }
              }
              if(element.type === "playlist"){
                if(item.tags&&item.tags.length>0){
                  item.tags.forEach(i=>{
                    arrPlaylist.push({tag: i})
                  })
                }
              }
            })
            userData[element.type].sort(function(val1, val2){
              if(val1.playCount < val2.playCount){
                return -1
              }else if(val1.playCount < val2.playCount){
                return 1
              }else{
                return 0
              }
            })
            userData[element.type].reverse()
          });
          userData.artist = arrSonger.reduce((obj, item) => {  
            let find = obj.find(i => i.id === item.id)
            let _d = {  
              ...item,  
              num : 1
            }  
            find ? (find.num+=1) : obj.push(_d)  
            return obj
          }, [])
          userData.playlistTags = arrPlaylist.reduce((obj, item) => {  
            let find = obj.find(i => i.tag === item.tag)
            let _d = {  
              ...item,  
              num : 1
            }  
            find ? (find.num+=1) : obj.push(_d)  
            return obj
          }, [])
          userData.artist.sort(function(val1, val2){
            if(val1.num < val2.num){
              return -1
            }else if(val1.num < val2.num){
              return 1
            }else{
              return 0
            }
          })
          userData.playlistTags.sort(function(val1, val2){
            if(val1.num < val2.num){
              return -1
            }else if(val1.num < val2.num){
              return 1
            }else{
              return 0
            }
          })
          userData.artist.reverse()
          userData.playlistTags.reverse()
          const queryComment = commentModel.find({});
          const promiseComment = queryComment.exec();
          promiseComment.then(value=>{
            if(value&&value.length>0){
              userData.commentCount = value.reduce((count, item)=>{
                if(item.user.username === username){
                  return count+1
                }else{
                  return count
                }
              },0)
              res.json({data:{success:"true", userData}});
            }else{
              res.json({data:{success:"false"}});
            }
          }, err=>{res.json({data:{success:"false"}});
          })
        }else{res.json({data:{success:"false"}});
        }
      }, err => {res.json({data:{success:"false"}});})
    }else{res.json({data:{success:"false"}});
    }
  }, err => {res.json({data:{success:"false"}});})
})

module.exports = router;