const multer =require('multer')

function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = $chars.length;
  let rand= '';
　for (i = 0; i < len; i++) {
　　rand+= $chars.charAt(Math.floor(Math.random() * maxPos));
　}
　return rand;
}

function randomId(){
  return parseInt(Math.random().toString().substr(3, 3) + Date.now())
}

function dir(destination){
  let upload = multer({
    storage: multer.diskStorage({
      destination: destination,
      filename: function (req, file, cb) {
        var changedName = (new Date().getTime())+'-'+file.originalname;
        cb(null, changedName);
      }
    })
  });
  return upload
}

function postCompare(val1, val2){
  if(val1.date < val2.date){
    return -1
  }else if(val1.date < val2.date){
    return 1
  }else{
    return 0
  }
}

function getDiffDate(targetDate) {
  let date1 = new Date(targetDate);
  let date2 = new Date();
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diff = date2.getTime() - date1.getTime();
  const diffDate = diff / (24 * 60 * 60 * 1000);
  return diffDate;
}

function isNull(str){
  if (str === "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

module.exports = {
  randomString,
  randomId,
  dir,
  postCompare,
  getDiffDate,
  isNull
}