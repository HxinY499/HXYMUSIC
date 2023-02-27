import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { getDate } from '@/services/user';
import { songYear, songArea } from '@/common/local-data.js';

import { UserDataWrapper, NotShowWrapper } from './style';
import QueueAnim from 'rc-queue-anim';
import { Bar, Pie, WordCloud, Column } from '@ant-design/charts';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import XYEmpty from '@/components/empty';

export default memo(function XYUserData() {
  const state = useSelector(
    state => ({
      loginUser: state.getIn(['user', 'loginUser']),
    }),
    shallowEqual
  );
  const [userData, setUserData] = useState(null);
  const [times, setTimes] = useState([]);
  const [aDay, setADay] = useState();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    getDate(state.loginUser && state.loginUser.username).then(res => {
      console.log(res);
      if (res.data && res.data.success === 'true') {
        setUserData(res.data.userData);
      }
    });
  }, [state.loginUser]);

  useEffect(() => {
    let arr = [];
    userData &&
      userData.times &&
      userData.times.forEach(item => {
        arr.push({ hour: new Date(item).getUTCHours() + 1 });
      });
    let timeArr = arr.reduce((obj, item) => {
      let find = obj.find(i => i.hour === item.hour);
      let _d = {
        ...item,
        num: 1,
      };
      find ? (find.num += 1) : obj.push(_d);
      return obj;
    }, []);
    timeArr.sort(function (val1, val2) {
      if (val1.num < val2.num) {
        return -1;
      } else if (val1.num < val2.num) {
        return 1;
      } else {
        return 0;
      }
    });
    timeArr.reverse();
    setTimes(timeArr);
    //至少听过20首歌才可以展示数据
    console.log(userData);
    if (userData && userData.song && userData.song.length >= 20) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [userData]);
  useEffect(() => {
    if (
      times &&
      times[0] &&
      times[0].hour >= 9 &&
      times &&
      times[0] &&
      times[0].hour < 12
    ) {
      setADay('上午');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 6 &&
      times &&
      times[0] &&
      times[0].hour < 9
    ) {
      setADay('早晨');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 12 &&
      times &&
      times[0] &&
      times[0].hour < 14
    ) {
      setADay('中午');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 14 &&
      times &&
      times[0] &&
      times[0].hour < 18
    ) {
      setADay('下午');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 18 &&
      times &&
      times[0] &&
      times[0].hour < 19
    ) {
      setADay('傍晚');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 19 &&
      times &&
      times[0] &&
      times[0].hour <= 24
    ) {
      setADay('晚上');
    } else if (
      times &&
      times[0] &&
      times[0].hour >= 0 &&
      times &&
      times[0] &&
      times[0].hour < 3
    ) {
      setADay('半夜');
    } else {
      setADay('凌晨');
    }
  }, [times]);

  let configSong = {
    data: userData && userData.song && userData.song.slice(0, 15),
    xField: 'playCount',
    yField: 'name',
    seriesField: 'name',
    legend: { position: 'left' },
  };
  let configAlbum = {
    data: userData && userData.album && userData.album.slice(0, 15),
    xField: 'playCount',
    yField: 'name',
    seriesField: 'name',
    legend: { position: 'right' },
  };
  let configPlaylist = {
    data: userData && userData.playlist && userData.playlist.slice(0, 15),
    xField: 'playCount',
    yField: 'name',
    seriesField: 'name',
    legend: { position: 'right' },
  };
  let configArtist = {
    data: userData && userData.artist && userData.artist.slice(0, 15),
    xField: 'num',
    yField: 'name',
    seriesField: 'name',
    legend: { position: 'left' },
  };
  let configplaylistTag = {
    data: userData && userData.playlistTags,
    wordField: 'tag',
    weightField: 'num',
    color: '#fff',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [24, 80],
    },
    interactions: [{ type: 'element-active' }],
    state: { active: { style: { lineWidth: 3 } } },
  };
  let configSongArea = {
    appendPadding: 10,
    data: songArea,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    width: 300,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{name}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    legend: { position: 'left' },
  };
  let configSongYear = {
    appendPadding: 10,
    data: songYear,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    width: 300,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{name}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    legend: { position: 'left' },
  };
  let configUserTime = {
    data: times,
    xField: 'hour',
    yField: 'num',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: '时间/时' },
      sales: { alias: '听歌次数' },
    },
  };
  return (
    <div>
      {state.loginUser && state.loginUser.username ? (
        <div>
          {isShow ? (
            <UserDataWrapper>
              <div className="wrap-v2">
                <QueueAnim delay={300} className="queue-simple">
                  <h2 key="a">
                    这是您在HXYMUSIC的第
                    <span className="data">
                      {userData && userData.registerTime}
                    </span>
                    天
                  </h2>
                  <div className="title" key="b">
                    你听过...
                  </div>
                  <div className="content" key="c">
                    听过
                    <span className="data">
                      {userData && userData.song && userData.song.length}
                    </span>
                    首歌、
                    <span className="data">
                      {userData && userData.album && userData.album.length}
                    </span>
                    张专辑、
                    <span className="data">
                      {userData &&
                        userData.playlist &&
                        userData.playlist.length}
                    </span>
                    张歌单、
                    <span className="data">
                      {userData && userData.mv && userData.mv.length}
                    </span>
                    个MV
                  </div>
                  <div className="content" key="d">
                    <span className="little-data">
                      {userData && userData.song && userData.song[0].name}
                    </span>
                    是你听过最多的一首歌
                    <div className="chart">
                      {userData && userData.song ? (
                        <Bar {...configSong} />
                      ) : null}
                    </div>
                  </div>
                  <div key="e" className="content">
                    <span className="little-data">
                      {userData && userData.album && userData.album[0].name}
                    </span>
                    是你听过最多的一张专辑
                    <div className="chart">
                      {userData && userData.album ? (
                        <Bar {...configAlbum} />
                      ) : null}
                    </div>
                  </div>
                  <div key="f" className="content">
                    <span className="little-data">
                      {userData &&
                        userData.playlist &&
                        userData.playlist[0].name}
                    </span>
                    是你听过最多的一张歌单
                    <div className="chart">
                      {userData && userData.playlist ? (
                        <Bar {...configPlaylist} />
                      ) : null}
                    </div>
                  </div>
                  <div key="g" className="content">
                    你经常听
                    {userData &&
                      userData.artist &&
                      userData.artist.slice(0, 3).map((item, index) => {
                        return (
                          <span key={index} className="little-data">
                            {item.name}
                          </span>
                        );
                      })}
                    的音乐
                    <div className="chart">
                      {userData && userData.artist ? (
                        <Bar {...configArtist} />
                      ) : null}
                    </div>
                  </div>
                  <div key="h" className="title">
                    你喜欢...
                  </div>
                  <div key="i" className="content">
                    收藏了
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.song &&
                        userData.likes.song.length}
                    </span>
                    首歌、
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.album &&
                        userData.likes.album.length}
                    </span>
                    张专辑、
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.playlist &&
                        userData.likes.playlist.length}
                    </span>
                    张歌单、
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.mv &&
                        userData.likes.mv.length}
                    </span>
                    个MV
                  </div>
                  <div key="j" className="content">
                    关注了
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.artist &&
                        userData.likes.artist.length}
                    </span>
                    位歌手、
                    <span className="data">
                      {userData &&
                        userData.likes &&
                        userData.likes.user &&
                        userData.likes.user.length}
                    </span>
                    位用户
                  </div>
                  <div key="k" className="content">
                    你最爱听
                    {userData &&
                      userData.playlistTags &&
                      userData.playlistTags.slice(0, 3).map((item, index) => {
                        return (
                          <span key={index} className="little-data">
                            {item.tag}
                          </span>
                        );
                      })}
                    类型的歌单
                    <div className="chart">
                      {userData && userData.playlistTags ? (
                        <WordCloud {...configplaylistTag} />
                      ) : null}
                    </div>
                  </div>
                  <div key="l" className="content">
                    你最爱听的歌曲地区和年份
                    <div className="chart">
                      <Pie {...configSongArea} />
                      <Pie {...configSongYear} />
                    </div>
                  </div>
                  <div key="m" className="title">
                    你留下...
                  </div>
                  <div key="n" className="content">
                    你创建了
                    <span className="little-data">
                      {userData &&
                        userData.createPlaylists &&
                        userData.createPlaylists.length}
                    </span>
                    张歌单
                  </div>
                  <div key="o" className="content">
                    发表了
                    <span className="little-data">
                      {userData && userData.posts && userData.posts.length}
                    </span>
                    条动态、
                    <span className="little-data">
                      {userData && userData.commentCount}
                    </span>
                    条评论
                  </div>
                  <div key="p" className="title">
                    你习惯...
                  </div>
                  <div key="q" className="content">
                    你习惯在<span className="little-data">{aDay}</span>听歌
                    {times ? (
                      <div className="chart">
                        <Column {...configUserTime} />
                      </div>
                    ) : null}
                  </div>
                  <div key="r" className="content">
                    ... ... ...
                  </div>
                  <div key="s" className="content">
                    ... ... ...
                  </div>
                  <div key="t" className="content end">
                    ... ... ...
                  </div>
                </QueueAnim>
              </div>
            </UserDataWrapper>
          ) : (
            <NotShowWrapper className="wrap-v2">
              <ExclamationCircleOutlined />
              听过20首歌即可开启数据分析
            </NotShowWrapper>
          )}
        </div>
      ) : (
        <XYEmpty></XYEmpty>
      )}
    </div>
  );
});
