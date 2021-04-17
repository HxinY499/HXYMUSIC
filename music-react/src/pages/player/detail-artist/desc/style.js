import styled from 'styled-components'

export const DetailArtistDescWrapper = styled.div`
  font-size: 1rem;
  .title{
    font-weight: 700;
    color: var(--black);
    margin-bottom: 0.8em;
  }
  .briefDesc{
    .big-title{
      font-size: 0.9em;
      border-left: 5px solid var(--red);
      padding: 0 0.5em;
    }
  }
  .introduction .content,
  .briefDesc .content{
    font-size: 0.8em;
    color: #666;
  }
  .briefDesc,.introduction li{
    margin-bottom: 2.5em;
  }
`