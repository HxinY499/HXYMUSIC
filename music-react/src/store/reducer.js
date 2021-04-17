import {combineReducers} from 'redux-immutable'

import {reducer as recommendReducer} from '../pages/discover/c-pages/recommend/store'
import {reducer as playerReducer} from '../pages/player/store'
import {reducer as userReducer} from '../pages/user/store'
import {reducer as rangkingReducer} from '../pages/discover/c-pages/ranking/store'
import {reducer as playlistReducer} from '../pages/discover/c-pages/playlist/store'
import {reducer as artistReducer} from '../pages/discover/c-pages/artist/store'
import {reducer as albumReducer} from '../pages/discover/c-pages/album/store'
import {reducer as mineReducer} from '../pages/mine/store'
import {reducer as friendReducer} from '../pages/friend/store'
import {reducer as searchReducer} from '../pages/search/store'

const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
  user: userReducer,
  ranking: rangkingReducer,
  playlist: playlistReducer,
  artist: artistReducer,
  album: albumReducer,
  mine: mineReducer,
  friend: friendReducer,
  search: searchReducer
})

export default cReducer
