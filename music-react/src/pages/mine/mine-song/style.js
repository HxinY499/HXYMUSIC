import styled from 'styled-components'

export const MineSongWrapper = styled.div`
  font-size: 1rem;
  .control{
    margin-bottom: 2em;
    .other-btn{
      button:first-child,button:nth-child(3),button:nth-child(2){
        display: none;
      }
    }
  }
`