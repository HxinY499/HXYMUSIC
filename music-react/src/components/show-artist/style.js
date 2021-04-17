import styled from 'styled-components'

export const ShowArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-wrapper{
    display: block;
    width: 130px;
    height: 130px;
    border: 1px solid var(--line);
    overflow: hidden;
    img{
      display: inline-block;
      width: 100%;
      transition: all 0.4s;
      vertical-align: middle;
      object-fit: fill;
      :hover{
        transform: scale(1.1);
      }
    }
  }
  .name{
    display: inline-block;
    margin: 0 auto;
    font-size: 0.9em;
    color: var(--black);
  }
`