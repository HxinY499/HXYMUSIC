import { Map } from 'immutable';
import * as actionTypes from './constants';

const defaultState = Map({
  loginUser: JSON.parse(localStorage.getItem('loginUser') || '{}'),
  showUser: {},
  likeSongs: [],
  focus: [],
  fans: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LOGIN_USER:
      return state.set('loginUser', action.user);
    case actionTypes.CHANGE_SHOW_USER:
      return state.set('showUser', action.user);
    case actionTypes.CHANGE_LIKE_SONGS:
      return state.set('likeSongs', action.likeSongs);
    case actionTypes.CHANGE_FOCUS:
      return state.set('focus', action.focus);
    case actionTypes.CHANGE_FANS:
      return state.set('fans', action.fans);
    default:
      return state;
  }
}
export default reducer;
