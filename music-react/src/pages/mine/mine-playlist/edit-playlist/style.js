import styled from 'styled-components'

export const EditPlaylistWrapper = styled.div`
  position: relative;
  .cover{
    position: relative;
    margin-top: 3.5em;
    overflow: auto;
    .old-cover{
      margin-left: 5.5em;
      img.now{
        width: 150px;
      }
      .change-cover{
        width: 150px;
        position: absolute;
        line-height: 20px;
        background-color: #737272;
        font-size: 0.8em;
        color: #fff;
        top: 130px;
        text-align: center;
        cursor: pointer;
        :hover{
          text-decoration: underline;
        }
      }
    }
    .changeCover{
      .ca-title{
        font-size: 14px;
        font-family: simsun, 宋体;
        font-weight: 700;
        color: var(--black);
        margin-bottom: 20px;
        padding-left: 5px;
        .return{
          color: #0c73c2;
          cursor: pointer;
          margin-right: 10px;
          :hover{
            text-decoration: underline;
          }
        }
        .icon{
          color: #a69999;
          font-size: 12px;
          margin-right: 10px;
        }
      }
    }
  }
  
  .mine-form-item{
    display: flex;
    position: relative;
    margin: 2em 0 3em 3.3em;
    .form-item-title{
      color: var(--black);
      margin-right: 0.5em;
    }
    .tip{
      position: absolute;
      font-size: 0.6em;
      color: #666;
      top: 3.5em;
      left: 5em;
    }
    .pick-item{
      background-color: var(--red);
      color: #fff;
      font-size: 0.8em;
      padding: 0.4em 0.6em;
      margin-right: 0.6em;
      border-radius: 1em;
      i{
        visibility: hidden;
        margin-left: 0.3em;
        font-size: 1.2em;
        cursor: pointer;
      }
      :hover{
        i{
          visibility: visible;
        }
      }
    }
    .pick-btn{
      color: var(--font-blue);
      cursor: pointer;
      :hover{
        text-decoration: underline;
      }
    }
  }
  .form-desc div label{
    color: var(--black);
  }
  .show-pick-enter,
  .show-pick-appear {
    opacity: 0;
    transform: translateY(1em);
  }

  .show-pick-enter-active,
  .show-pick-appear-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }

  .show-pick-exit {
    opacity: 1;
  }

  .show-pick-exit-active {
    opacity: 0;
    transform: translateY(1em);
    transition: opacity 300ms, transform 300ms;
  }
`

export const CategoryPanelWrapper = styled.ul`
  position: absolute;
  z-index: 100;
  top: 6.5em;
  width: 45em;
  height: 25em;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  overflow: auto;
  padding: 1.25em;
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
  .category-wrapper{
    margin-bottom: 0.625em;
    .category-title{
      margin-bottom: 0.725em;
      font-weight: bold;
      span{
        margin-right: 0.625em;
      }
    }
    .category-content{
      display: flex;
      flex-wrap: wrap;
      li{
        font-size: 0.8em;
        background-color: var(--btn-detail);
        border-radius: 1.2em;
        padding: 0.3em 0.9em;
        margin-right: 0.8em;
        cursor: pointer;
        margin-bottom: 0.8em;
        transition: all 0.3s;
        :hover{
          background-color: var(--red);
          color: #fff;
        }
      }
      .active-category{
        background-color: var(--red);
        color: #fff;
      }
    }
  }
`