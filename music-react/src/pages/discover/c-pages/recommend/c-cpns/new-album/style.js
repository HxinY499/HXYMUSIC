import styled from 'styled-components'

export const XYNewAlbumWrapper = styled.div`
  margin: 30px 0;
  padding: 20px;
  padding-bottom: 10px;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
`

export const XYNewAlbumContent = styled.div`
  position: relative;
  width: 940px;
  height: 184px;
  background-color:#f5f5f5;
  border: 1px solid #d3d3d3;
  margin: 20px 0 37px 0;
  padding-top: 28px;
  background-color: var(--rcm-carousel) !important;
  border-color: var(--line);
  .album-page{
    display: flex !important;
    width: 860px !important;
    margin: 0 auto !important;
    justify-content: space-around;
  }
  button{
    position: absolute;
    width: 17px;
    height: 17px;
    top:81px;
    z-index: 99;
    cursor: pointer;
  }
  .left{
    background-position: -260px -75px;
    left: 4px;
    :hover{
      background-position: -280px -75px;
    }
  }
  .right{
    background-position: -300px -75px;
    right: 4px;
    :hover{
      background-position: -320px -75px;
    }
  }

`