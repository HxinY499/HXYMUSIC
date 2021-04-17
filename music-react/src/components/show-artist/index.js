import React, { memo } from 'react'

import {getSizeImage} from '@/utils/format-utils'

import { ShowArtistWrapper } from './style'
import { NavLink } from 'react-router-dom'
export default memo(function XYShowArtist(props) {
  const artist = props.artist
  return (
    <ShowArtistWrapper>
      <NavLink to={`/discover/detailartist/main?id=${artist.id}`} className="img-wrapper">
        <img src={getSizeImage(artist.picUrl, 130)} alt={artist.name}></img>
      </NavLink>
      <NavLink to={`/discover/detailartist/main?id=${artist.id}`} className="name">
        <span>{artist.name}</span>
      </NavLink>
    </ShowArtistWrapper>
  )
})
