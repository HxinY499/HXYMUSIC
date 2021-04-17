import styled from 'styled-components'

export const DetailArtistSongWrapper = styled.div`
  font-size: 0.8em;
  thead{
    th:nth-child(4){
      display: none;
    }
  }
  tbody{
    td:nth-child(4){
      display: none;
    }
    td:nth-child(1){
      width: 10%;
    }
  }
  .control{
    margin-bottom: 1em;
  }
`