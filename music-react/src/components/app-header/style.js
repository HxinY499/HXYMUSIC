import styled from "styled-components"

export const XYHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #242424;

  .content{
    display:flex;
    justify-content:space-between;
    height: 100%;
    line-height:70px;
    color:#fff;
  }

  .bottom{
    height:5px;
    background-color:#c20c0c;
  }
  .search-panel{
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    width: 20em;
    z-index: 9999;
    background-color: var(--main-bg);
    border-radius: 5px;
    top: 5em;
    right: 15%;
    span.search-item{
      font-size: 0.8em;
      padding: 0.5em 1em;
      color: gray;
      margin: 0.5em 1em 0.5em 1em;
      border: 1px solid gray;
      cursor: pointer;
      transition: all 0.3s;
      :hover{
        border-color: #000;
        color: #000;
        box-shadow: 0 0 0.1em 0.1em rgba(0,0,0,0.5);
      }
    }
  }
  .show-input-panel-enter,
  .show-input-panel-appear {
    opacity: 0;
    top: 6em;
  }

  .show-input-panel-enter-active,
  .show-input-panel-appear-active {
    opacity: 1;
    top: 5em;
    transition: all 300ms;
  }

  .show-input-panel-exit {
    opacity: 1;
  }

  .show-input-panel-exit-active {
    opacity: 0;
    top: 6em;
    transition: all 300ms;
  }
`

export const XYHeaderContentLeft = styled.div`
  display:flex;
  .logo{
    display:block;
    text-align: center;
    height:69px;
    font-size: 28px;
    font-weight: 800;
    color: #c20c0c;
    margin-right:50px;
    text-decoration: none;
  }
  .left-content{
    display:flex;
  }
  .left-item{
    position:relative;
    /* margin: 0 30px; */
    a{
      display:block;
      transition: all 0.3s;
      padding:0 30px;
      color:#ccc;
      font-size:14px;
      :hover{
        color:#fff;
        text-decoration:none;
        background-color:#000;
      }
    }
    & a.active{
      color:#fff;
      text-decoration:none;
      background-color:#000;
      .icon{
        position:absolute;
        display:block;
        width:12px;
        height:7px;
        bottom:-1px;
        left:50%;
        transform:translate(-50%,0);
        background-position:-226px 0;
      }
    }
  }
`

export const XYHeaderContentRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  .search{
    height: 32px;
    border-radius: 32px;
    border:none;
    box-shadow:none;
    input#main-search{
      width: 100px;
      ::placeholder {
        font-size: 12px;
      }
      :focus{
        width: 180px;
      }
    }
  }
  .user{
    width: 70px;
    margin-right: 10px;
    margin-left: 30px;
    .tip{
      width: 63.9px;
    }
  }
  
  
`