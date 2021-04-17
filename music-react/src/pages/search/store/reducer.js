import {Map} from "immutable"
import * as actionTypes from './constants';

const defaultState = Map({
  searchResult: {}
})

function reducer(state=defaultState, action){
  switch(action.type){
    case actionTypes.CHANGE_SEARCH_RESULT:
      return state.set("searchResult", action.searchResult);
    default:
      return state;
  }
}
export default reducer