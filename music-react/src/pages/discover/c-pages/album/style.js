import styled from "styled-components"

export const AlbumWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em;
  ul.content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      margin: 0 1em 1em 1em;
    }
  }
  .title{
    font-size: 1.4em;
    border-bottom: 2px solid var(--red);
    margin: 0 0.6em 1em 0.6em;
  }
`

export const HotAlbums = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.25em;
  margin-bottom: 0.625em;
`

export const AllAlbums = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.25em;
  .title{
    display: flex;
  }
  .category{
    display: flex;
    font-size: 0.6em;
    padding-top: 0.8em;
    color: #666;
    margin-left: 1.5em;
    cursor: pointer;
    li{
      :hover{
        text-decoration: underline;
      }
    }
    i{
      vertical-align: middle;
      margin: 0 0.8em;
    }
  }
`