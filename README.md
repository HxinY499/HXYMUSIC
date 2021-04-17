# HXYMUSIC

前端：React  （music-react文件夹）

后端：

1. 自定义后端，Express （server文件夹）
2. [开源网易云接口项目](https://github.com/Binaryify/NeteaseCloudMusicApi)

数据库：MongoDB

#### 运行

前端：

1. yarn install
2. yarn start

后端：

1. 自定义：（数据库信息在db/index.js）
   1. npm install
   2. npm start
2. 网易云：
   1. npm install
   2. 修改运行端口为9001，在app.js下添加`process.env.PORT = 9001`
   3. npm start