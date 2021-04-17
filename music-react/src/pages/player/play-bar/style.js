import styled from 'styled-components'

export const XYPlayBarWrapper = styled.div`
  height: 53px;
  width: 100%;
  background-position: 0 0;
  background-repeat: repeat;
  .ani-enter,
  .ani-appear {
    opacity: 0;
    transform: translateY(10px);
  }

  .ani-enter-active,
  .ani-appear-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 200ms, transform 200ms;
  }

  .ani-exit {
    opacity: 1;
  }

  .ani-exit-active {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 200ms, transform 200ms;
  }
`

export const XYPlayBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  height: 42px;
`

export const XYPlayBarControl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  width: 137px;
  .btn{
    cursor: pointer;
  }
  .prev, .next {
    width: 28px;
    height: 28px;
  }
  .prev {
    background-position: 0 -130px;
  }
  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${props => props.isPlaying ? "-165px": "-204px"};
  }
  .next {
    background-position: -80px -130px;
  }
`

export const XYPlayBarPlayinfo = styled.div`
  flex: 5;
  display: flex;
  width: 642px;
  height: 100%;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 6px;
      left: 6px;
      a{text-decoration: none;}
      .song-name{a{color: #fff;}}
      .singer-name {
        a{color: #a1a1a1;}
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;
      transform:translateY(-2px);

      .ant-slider {
        width: 493px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${require("@/assets/img/progress_bar.png").default}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${require("@/assets/img/progress_bar.png").default}) left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -7px;
          background: url(${require("@/assets/img/sprite_icon.png").default}) 0 -250px;
        }
      }

      .time {
        .now-time {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`

export const XYPlayBarOperate = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  align-items:center;
  height:100%;

  .btn {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .favor {
    background-position: -88px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;
    
    .volume {
      background-position: -2px -248px;
    }
    .volume-wrapper{
      position: absolute;
      top: -9.5em;
      right: 8.2em;
      background-color: var(--black);
      height: 10em;
      padding: 1em 0 1.5em 0;
      .ant-slider-track{
        background-color: var(--red);
      }
      .ant-slider-handle{
        border-color: var(--black);
        box-shadow: none;
      }
    }

    .loop {
      background-position: ${props => {
        switch(props.sequence) {
          case 1:
            return "-66px -248px";
          case 2:
            return "-66px -344px";
          default:
            return "-3px -344px";
        }
      }};
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
    }
  }
  .playlist-panel{
    position: absolute;
    background-color: #242424;
    bottom: 45px;
    right: -180px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    border-radius: 5px;
    .playlist-panel-title{
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.1em;
      padding: 0.5em 1.5em;
      border-bottom: 1px solid #000;
    }
    ul{
      width: 500px;
      height: 280px;
      overflow: auto;
      
      li{
        transition: color 100ms;
        padding: 0.3em;
        position: relative;
        cursor: pointer;
        a,span{
          color: #999;
          font-size: 1.1em;
        }
        .playlist-panel-playicon{
          visibility: hidden;
          font-size: 1.5em;
          color: var(--red) !important;
          vertical-align: middle;
          margin-right: 0.5em;
          margin-left: 0.3em;
        }
        .playlist-panel-name{
          position: absolute;
          left: 2.5em;
          width: 8em;
          text-decoration: none;
        }
        .playlist-panel-artist{
          position: absolute;
          width: 6em;
          left: 24em;
        }
        .playlist-panel-time{
          position: absolute;
          right: 2em;
        }
        .control-wrapper{
          position: absolute;
          visibility: hidden;
          left: 15em;
        }
        :hover{
          background-color: #000;
          a,span{
            color: #fff;
          }
          .control-wrapper{
            visibility: visible;
          }
        }
      }
      li.li-active{
        background-color: #000;
        a,span{
          color: #fff;
        }
        .playlist-panel-playicon{
          visibility: visible;
        }
      }
      ::-webkit-scrollbar {/*隐藏滚轮*/display: none;}
    }
  }
  
`