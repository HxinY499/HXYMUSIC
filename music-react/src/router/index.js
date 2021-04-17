import React from "react"
import { Redirect } from "react-router-dom"

const XYDiscover = React.lazy(() => import("@/pages/discover"))
const XYRecommend = React.lazy(() => import("@/pages/discover/c-pages/recommend"))
const XYAlbum = React.lazy(() => import("@/pages/discover/c-pages/album")) 
const XYArtist = React.lazy(() => import("@/pages/discover/c-pages/artist")) 
const XYRanking = React.lazy(() => import("@/pages/discover/c-pages/ranking")) 
const XYPlaylist = React.lazy(() => import("@/pages/discover/c-pages/playlist")) 
const XYMine = React.lazy(() => import("@/pages/mine")) 
const XYMineSong = React.lazy(() => import("@/pages/mine/mine-song")) 
const XYMineAlbum = React.lazy(() => import("@/pages/mine/mine-album")) 
const XYMinePlaylist = React.lazy(() => import("@/pages/mine/mine-playlist")) 
const XYMineMV = React.lazy(() => import("@/pages/mine/mine-mv")) 
const XYMineArtist = React.lazy(() => import("@/pages/mine/mine-artist")) 
const XYMineData = React.lazy(() => import("@/pages/mine/mine-data")) 
const XYFriend = React.lazy(() => import("@/pages/friend")) 
const XYDetailSong = React.lazy(() => import("@/pages/player/detail-song"))
const XYDetailPlaylist = React.lazy(() => import("@/pages/player/detail-playlist"))
const XYDetailAlbum = React.lazy(() => import("@/pages/player/detail-album"))
const XYDetailMV = React.lazy(() => import("@/pages/player/detail-mv"))
const XYDetailArtist = React.lazy(() => import("@/pages/player/detail-artist"))
const XYDetailArtistSong = React.lazy(() => import("@/pages/player/detail-artist/song"))
const XYDetailArtistAlbum = React.lazy(() => import("@/pages/player/detail-artist/album"))
const XYDetailArtistnMv = React.lazy(() => import("@/pages/player/detail-artist/mv"))
const XYDetailArtistDesc = React.lazy(() => import("@/pages/player/detail-artist/desc"))
const XYUserSetting = React.lazy(() => import("@/pages/user/setting"))
const XYUserSettingBasic = React.lazy(() => import("@/pages/user/setting/c-pns/basic"))
const XYUserSettingPrivate = React.lazy(() => import("@/pages/user/setting/c-pns/private"))
const XYUserSettingPrivateHome = React.lazy(() => import("@/pages/user/setting/c-pns/private/c-pns/private-home"))
const XYUserSettingPrivateTest = React.lazy(() => import("@/pages/user/setting/c-pns/private/c-pns/test"))
const XYUserSettingPrivatePassword = React.lazy(() => import("@/pages/user/setting/c-pns/private/c-pns/set-password"))
const XYUserSettingPrivatePassProtect = React.lazy(() => import("@/pages/user/setting/c-pns/private/c-pns/set-pass-protect"))
const XYUserHome = React.lazy(() => import("@/pages/user/home"))
const XYUserHomeLike = React.lazy(() => import("@/pages/user/home/like"))
const XYUserHomeFans = React.lazy(() => import("@/pages/user/home/fans"))
const XYUserHomeFocus = React.lazy(() => import("@/pages/user/home/focus"))
const XYUserHomePost = React.lazy(() => import("@/pages/user/home/post"))
const XYUserData = React.lazy(() => import("@/pages/user-data"))
const XYSearch = React.lazy(() => import("@/pages/search"))


const routes = [
  {
    path: "/",
    exact:true,
    render: () => {
      return <Redirect to="/discover"/>
    }
  },
  {
    path: "/discover",
    component: XYDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (<Redirect to="/discover/recommend"/>)
      },
      {
        path: "/discover/recommend",
        component: XYRecommend
      },
      {
        path: "/discover/album",
        component: XYAlbum
      },
      {
        path: "/discover/artist",
        component: XYArtist
      },
      {
        path: "/discover/ranking",
        component: XYRanking
      },
      {
        path: "/discover/playlist",
        component: XYPlaylist
      },
      {
        path: "/discover/detailsong",
        component: XYDetailSong
      },
      {
        path: "/discover/detailplaylist",
        component: XYDetailPlaylist
      },
      {
        path: "/discover/detailalbum",
        component: XYDetailAlbum
      },
      {
        path: "/discover/detailmv",
        component: XYDetailMV
      },
      {
        path: "/discover/detailartist",
        component: XYDetailArtist,
        routes: [
          {
            path: "/discover/detailartist",
            exact: true,
            render: () => (<Redirect to="/discover/detailartist/main"/>)
          },
          {
            path: "/discover/detailartist/main",
            component: XYDetailArtistSong
          },
          {
            path: "/discover/detailartist/album",
            component: XYDetailArtistAlbum
          },
          {
            path: "/discover/detailartist/mv",
            component: XYDetailArtistnMv
          },
          {
            path: "/discover/detailartist/desc",
            component: XYDetailArtistDesc
          }
        ]
      }
    ]
  },
  {
    path: "/mine",
    component: XYMine,
    routes: [
      {
        path: "/mine",
        exact: true,
        render: () => (<Redirect to="/mine/song"/>)
      },
      {
        path: "/mine/song",
        component: XYMineSong
      },
      {
        path: "/mine/album",
        component: XYMineAlbum
      },
      {
        path: "/mine/artist",
        component: XYMineArtist
      },
      {
        path: "/mine/mv",
        component: XYMineMV
      },
      {
        path: "/mine/playlist",
        component: XYMinePlaylist
      },
      {
        path: "/mine/data",
        component: XYMineData
      }]
  },
  {
    path: "/friend",
    component: XYFriend
  },
  {
    path: "/user/home",
    component: XYUserHome,
    routes: [
      {
        path: "/user/home",
        exact:true,
        render: () => (<Redirect to="/user/home/like"/>)
      },
      {
        path: "/user/home/like",
        component: XYUserHomeLike,
      },
      {
        path: "/user/home/fans",
        component: XYUserHomeFans,
      },
      {
        path: "/user/home/focus",
        component: XYUserHomeFocus,
      },
      {
        path: "/user/home/post",
        component: XYUserHomePost,
      }
    ]
  },
  {
    path: "/user/setting",
    component: XYUserSetting,
    routes: [
      {
        path: "/user/setting",
        exact: true,
        render: () => (<Redirect to="/user/setting/basic"/>)
      },
      {
        path: "/user/setting/basic",
        component: XYUserSettingBasic
      },
      {
        path: "/user/setting/private",
        component: XYUserSettingPrivate,
        routes: [
          {
            path: "/user/setting/private",
            exact: true,
            render: () => (<Redirect to="/user/setting/private/home"/>)
          },
          {
            path: "/user/setting/private/home",
            component: XYUserSettingPrivateHome
          },
          {
            path: "/user/setting/private/privatetest",
            component: XYUserSettingPrivateTest
          },
          {
            path: "/user/setting/private/setpassprotect",
            component: XYUserSettingPrivatePassProtect
          },
          {
            path: "/user/setting/private/setpassword",
            component: XYUserSettingPrivatePassword
          },
        ]
      }
    ]
  },
  {
    path: "/userdata",
    exact: true,
    component: XYUserData,
  },
  {
    path: "/search",
    exact: true,
    component: XYSearch,
  }
]

export default routes