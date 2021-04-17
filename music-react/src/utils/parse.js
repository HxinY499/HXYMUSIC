export function parseLyric(lyric){
  const res = []
  const lrcArr = lyric.split('\n')
  const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  for(let line of lrcArr){
    const result = parseExp.exec(line)
    if (!result) continue;
    const time1 = result[1] * 60 * 1000;
    const time2 = result[2] * 1000;
    const time3 = result[3].length === 3? result[3]*1: result[3]*10;
    const time = time1 + time2 + time3;
    const content = line.replace(parseExp, "").trim();
    const lineObj = {time, content};
    res.push(lineObj)
  }
  return res
}

export function textParse(txt){
  if(typeof txt === "string" && txt.length>0){
    return txt.replace("\n","<br>")
  }else{
    return
  }
}

// //一维数组转二维数组
// //n:每行几个
// export function twoDimensionalArray(baseArray, n){
//   let len = baseArray.length;
//   let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
//   let newArr = [];
//   for (let i = 0; i < lineNum; i++) {
//     //浅拷贝，若生成的二维数组以后会修改，为不影响原始数组，应该使用深拷贝
//     let temp = baseArray.slice(i*n, i*n+n);
//     newArr.push(temp);
//   }
//   return newArr;
// }

// export function arrLength(array){
//   let num = 0
//   array.forEach(item => {
//     if(item.length > 0){
//       item.forEach(item2 => {
//         if(JSON.stringify(item2) !== "{}"){
//           num++
//         }
//       })
//     }
//   })
//   return num;
// }