import styled from 'styled-components'

export const DetailArtistAlbumWrapper = styled.div`
  font-size: 1rem;
  .albums{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    .album-item{
      margin: 0 1em 1em 1em;
    .bottom{
      display: none;
    }
    .center{
      font-size: 0.9em;
    }
    .time{
      display: inline-block;
      font-size: 0.8em;
      transform: translateY(-10px);
      color: #666;
    }
    }
  }
  
  .album-page{
    width: 100%;
  }
`