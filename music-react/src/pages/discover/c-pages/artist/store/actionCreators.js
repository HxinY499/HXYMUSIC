import * as actionTypes from "./constants"
import { 
  getArtists
} from '@/services/artist'

const changeArtistsAction = (artists) => ({
  type: actionTypes.CHANGE_ARTISTS,
  artists
})

export const getArtistsAction = (type, area, initial) => {
  return dispatch => {
    getArtists(type, area, initial).then(res => {
      dispatch(changeArtistsAction(res.artists))
    })
  }
}