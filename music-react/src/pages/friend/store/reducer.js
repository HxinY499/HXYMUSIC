import {Map} from "immutable"
import * as actionTypes from './constants';

const defaultState = Map({
  posts: [],
  postComment: []
})

function reducer(state=defaultState, action){
  switch(action.type){
    case actionTypes.CHANGE_POSTS:
      return state.set("posts", action.posts);
    case actionTypes.CHANGE_POSTS_COMMENT:
      return state.set("postComment", action.postComment);
    default:
      return state;
  }
}
export default reducer