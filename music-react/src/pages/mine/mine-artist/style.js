import styled from 'styled-components'

export const MineArtistWrapper = styled.div`
  font-size: 1rem;
  .content{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1.98em;
    li{
      margin: 1em 1.98em;
      position: relative;
      .handle{
        position: absolute;
        font-size: 1.4em;
        top: 0;
        right: -1em;
        background-color: rgba(0,0,0,0.4);
        opacity: 0;
        border-radius: 0 0.3em 0.3em 0;
        transition: all 0.3s;
        i{
          display: block;
          padding: 0.2em;
          cursor: pointer;
        }
      }
      :hover{
        .handle{
          right: -1.2em;
          opacity: 1;
        }
      }
    }
  }
`