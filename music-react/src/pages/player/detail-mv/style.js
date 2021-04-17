import styled from "styled-components"

export const DetailMVWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em;
  display: flex;
  justify-content: space-between;
`

export const DetailMVLeft = styled.div`
  width: 72.5%;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.2em 2.2em;
  .big-title{
    position: relative;
    .icon{
      border: 1px solid var(--red);
      color: var(--red);
      padding: 0 0.1em;
      vertical-align: 10%;
    }
    .mv-name{
      font-size: 1.5em;
      font-weight: 400;
      margin-left: 0.3em;
    }
    .artist-name{
      font-size: 0.8em;
      color: #0c73c2;
      margin-left: 0.8em;
      a{
        vertical-align: text-bottom;
      }
    }
    .radio{
      position: absolute;
      right: 0;
      bottom: 0.2em;
      border: 1px solid #000;
      color: #fff;
      background-color: #000;
      opacity:0.8;
      padding: 0.02em 0.5em;
      cursor: pointer;
      ul{
        position: absolute;
        box-sizing: border-box;
        transition: all 0.2s ease 0.1s;
        visibility: hidden;
        border: 1px solid var(--line);
        top: -0.1em;
        border-bottom: none;
        right: -5.2em;
        width: 5em;
        opacity: 0;
        transform: translateX(-0.5em);
        li{
          font-size: 0.9em;
          box-sizing: border-box;
          text-align: center;
          color: #fff;
          background-color: #000;
          opacity:0.8;
          border-bottom: 1px solid var(--line);
          cursor: pointer;
          :hover{
            color: #fff;
            background-color: #333333;
          }
        }
        li.active{
          color: #fff;
          background-color: #333333;
        }
      }
      :hover{
        ul{
          visibility: visible;
          opacity: 0.8;
          transform: translateX(0);
        }
      }
      
    }
  }
  .play-banel{
    width: 40em;
    height: 22.5em;
    margin-bottom: 2em;
    padding: 0;
    video{
      display: block;
      width: 100%;
      height: 100%;
    }
    .radio{
      color: #000;
    }
  }
  .control{
    margin-top: -1em;
    margin-bottom: 1em;
    .play-button,.play-button2,.btn{
      display: none;
    }
    .other-btn button:first-child,
    .other-btn button:nth-child(3){
      display: inline-block;
    }
  }
`

export const DetailMVRight = styled.div`
  width: 26.6%;
  .title{
    font-size: 0.8125em;
    box-sizing: border-box;
    color: var(--black);
    font-weight: 600;
    border-bottom: 1px solid var(--line);
    padding: 0.5em;
    margin-bottom: 1.5em;
  }
  .mv-des{
    padding: 1em 1.5em;
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    .title{
      margin-bottom:0.5em;
    }
    .publish-time,.playCount{
      display: block;
      font-size: 0.7em;
      color: #999;
    }
    .content{
      font-size: 0.7em;
      color: var(--black);
      margin-top: 0.625em;
    }
  }
  .simi-mv{
    position: sticky;
    box-sizing: border-box;
    margin-top: 0.625em;
    top: 2.75em;
    padding: 1em 1.5em;
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    ul{
      margin: 0 -0.4em 0 -0.4em;
      li{
        display: flex;
        justify-content: space-between;
        width: 12.5em;
        margin: 0.5em;
        .mv-cover{
          width: 50%;
          position: relative;
          .video-icon{
            position: absolute;
            top: 0.2em;
            right: 0.625em;
            color: #fff;
            font-size: 0.8em;
          }
        }
        .mv-info{
          width: 47%;
          a,span{
            display: block;
            line-height: 1;
          }
          .name{
            font-size: 0.85em;
            color: var(--black);
            padding: 0.2em 0;
          }
          .time,.artist{
            font-size: 0.8em;
            color: #999;
            padding: 0.2em 0;
          }
        }
      }
    }
  }
`