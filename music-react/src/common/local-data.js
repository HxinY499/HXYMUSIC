export const headerLinks = [
  {
    title: "发现音乐",
    link: "/discover"
  },
  {
    title: "我的音乐",
    link: "/mine"
  },
  {
    title: "朋友",
    link: "/friend"
  },
  {
    title: "我的音乐数据",
    link: "/userdata"
  }
];

// discover中的数据
export const dicoverMenu = [
  {
    title: "推荐",
    link: "/recommend"
  },
  {
    title: "排行榜",
    link: "/ranking"
  },
  {
    title: "歌单",
    link: "/playlist"
  },
  {
    title: "歌手",
    link: "/artist"
  },
  {
    title: "新碟上架",
    link: "/album"
  }
];

//地区
export const residences = [
  {
    value: '内蒙古',
    label: '内蒙古',
    children: [
      {
        value: '呼和浩特',
        label: '呼和浩特',
        children: [
          {
            value: '赛罕区',
            label: '赛罕区',
          },
          {
            value: '金川区',
            label: '金川区',
          },
          {
            value: '玉泉区',
            label: '玉泉区',
          },
          {
            value: '新城区',
            label: '新城区',
          },
          {
            value: '回民区',
            label: '回民区',
          },
          {
            value: '金山区',
            label: '金山区',
          },
        ],
      },
      {
        value: '巴彦淖尔',
        label: '巴彦淖尔',
        children: [
          {
            value: '临河区',
            label: '临河区',
          },
          {
            value: '乌拉特前旗',
            label: '乌拉特前旗',
          },
          {
            value: '巴彦高勒',
            label: '巴彦高勒',
          },
          {
            value: '五原',
            label: '五原',
          }
        ],
      },
    ],
  },
  {
    value: '宁夏',
    label: '宁夏',
    children: [
      {
        value: '银川',
        label: '银川',
        children: [
          {
            value: '西夏区',
            label: '西夏区',
          },
          {
            value: '金凤区',
            label: '金凤区',
          },
          {
            value: '兴庆区',
            label: '兴庆区',
          },
        ],
      },
    ],
  }
];

//密保
export const passProtectQuestions = [
  "你最喜欢的格言是什么",
  "你家乡的名称是什么",
  "你读的小学叫什么",
  "你的父亲叫什么名字",
  "你的母亲叫什么名字",
  "你最喜欢的偶像是谁",
  "你最喜欢的歌曲是什么",
  "你最喜欢的电影是什么"
];

//全体歌单组件的热门推荐
export const hotCategory = ["全部", "华语", "流行", "摇滚", "民谣", "轻音乐", "学习", "工作"]

//全部歌手组件的歌手分类
export const allArtistCategory = [
  [["全部", -1],["华语", 7],["欧美", 96],["日本", 8],["韩国", 16],["其他", 0]],
  [["全部", -1],["男歌手", 1],["女歌手", 2],["乐队", 3]],
  [["热门", -1],["A", "a"],["B", "b"],["C", "c"],
  ["D", "d"],["E", "e"],["F", "f"],["G", "g"],
  ["H", "h"],["I", "i"],["J", "j"],["K", "k"],
  ["L", "l"],["M", "m"],["N", "n"],["O", "o"],
  ["P", "p"],["Q", "q"],["R", "r"],["S", "s"],
  ["T", "t"],["U", "u"],["V", "v"],["W", "w"],
  ["X", "x"],["Y", "y"],["Z", "z"],["其他", 0]]
]

//新碟上架界面，新碟分类
export const albumCategory = [["ALL","全部"],["ZH","华语"],["EA","欧美"],["KR","韩国"],["JP","日本"]]

//我的音乐小标题
export const mineTitle = [
  {
    title: "我喜欢的歌曲",
    link: "/song"
  },
  {
    title: "我喜欢的歌单",
    link: "/playlist"
  },
  {
    title: "我喜欢的专辑",
    link: "/album"
  },
  {
    title: "我喜欢的歌手",
    link: "/artist"
  },
  {
    title: "我喜欢的 MV",
    link: "/mv"
  },
  {
    title: "我的音乐历史",
    link: "/data"
  },
]

//歌单分类
export const allPlaylistCategory = [
  ["语种", ['华语','欧美','日语','韩语','粤语']],
  ["风格", ['流行','摇滚','民谣','电子','舞曲','说唱','轻音乐','爵士','乡村','R&B/Soul','古典','民族','英伦','金属',
          '朋克','蓝调','雷鬼','世界音乐','拉丁','New Age','古风','后摇','Bossa Nova']],
  ["场景", ['清晨','夜晚','学习','工作','午休','下午茶','地铁','驾车','运动','旅行','散步','酒吧']],
  ["情感", ['怀旧','清新','浪漫','伤感','治愈','放松','孤独','感动','兴奋','快乐','安静','思念']],
  ["主题", ['综艺','影视原声','ACG','儿童','校园','游戏','70后','80后','90后','网络歌曲','KTV','经典','翻唱','吉他','钢琴','器乐','榜单','00后']] 
]

//饼状图
export const songArea = [
  {
    type: '内地',
    value: 30,
  },
  {
    type: '港台',
    value: 25,
  },
  {
    type: '欧美',
    value: 9,
  },
  {
    type: '日本',
    value: 6,
  },
  {
    type: '韩国',
    value: 6,
  },
  {
    type: '其他',
    value: 3,
  }
];
export const songYear = [
  {
    type: '2010-2020',
    value: 98,
  },
  {
    type: '2021',
    value: 36,
  },
  {
    type: '2000s',
    value: 87,
  },
  {
    type: '1990s',
    value: 25,
  },
  {
    type: '1980s',
    value: 6,
  },
  {
    type: '更早',
    value: 2,
  }
];
