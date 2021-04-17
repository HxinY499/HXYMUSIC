import styled from 'styled-components'

export const ArtistWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em;
`

export const ArtistCategoryWrapper = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.25em;
  margin-bottom: 0.625em;
  ul{
    display: flex;
    li{
      font-size: 0.9em;
      transition: all 0.1s;
      color: var(--black);
      cursor: pointer;
      border-radius: 1em;
      :hover{
        color: var(--red);
      }
    }
    .area-active{
      background-color: var(--red);
      color: #fff;
    }
    .type-active{
      background-color: var(--red);
      color: #fff;
    }
    .initial-active{
      background-color: var(--red);
      color: #fff;
    }
    .active{
      :hover{
        color: #fff;
      }
    }
  }
  ul:nth-child(1),ul:nth-child(2){
    margin-bottom: 0.8em;
    li{
      padding: 0.25em 1em;
      margin-right: 0.625em;
    }
  }
  ul:nth-child(3){
    justify-content: space-around;
    li{
      padding: 0.25em 0.4em;
    }
  }
`

export const ArtistContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.25em 0.75em;
  .show-block{
    margin: 0 0.5em 1.5em 0.5em;
  }
`