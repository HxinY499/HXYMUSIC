import styled from 'styled-components'

export const DetailArtistWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  padding: 0.625em 0;
`

export const DetailArtistLeft = styled.div`
  width: 72.5%;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.2em 2.2em;
  .name-wrapper{
    margin-bottom: 0.3em;
    .zh-name{
      font-size: 1.5em;
      font-weight: 400;
      color: var(--black);
    }
    .en-name{
      font-size: 0.9em;
      color: #999;
      margin-left: 0.5em;
    }
  }
  .artistPic{
    position: relative;
    border: 1px solid var(--line);
    width: 40em;
    height: 18.75em;
    overflow: hidden;
    .show-img{
      vertical-align: middle;
    }
    .big-img{
      position: absolute;
      width: 40em;
      height: 18.75em;
      left: 0;
      top: 0;
      opacity: 0;
    }
    .control{
      position: absolute;
      z-index: 9;
      bottom: 0.5em;
      right: 0.5em;
      .play-button,.play-button2,.btn{
        display: none;
      }
      .other-btn button:first-child{
        display: inline-block;
      }
    }
  }
  .menu{
    display: flex;
    width: 100%;
    margin-bottom: 2em;
    border-top: 3px solid #c20c0c;
    background-color: var(--rcm-carousel);
    li{
      flex: 1;
      a{
        display: inline-block;
        width: 100%;
        padding: 0.6em 0;
        text-align: center;
        color: var(--black);
        font-size: 0.9em;
        text-decoration: none;
        transition: all 0.2s;
      }
      a:hover,a.active{
        background-color: #242424;
        color: #fff;
      }
    }
  }
`

export const DetailArtistRight = styled.div`
  width: 26.6%;
  .simi-artist{
    position: sticky;
    box-sizing: border-box;
    top: 2.75em;
    padding: 1em 1.5em;
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    .title{
      font-size: 0.8125em;
      box-sizing: border-box;
      color: var(--black);
      font-weight: 600;
      border-bottom: 1px solid var(--line);
      padding: 0.5em;
      margin-bottom: 1.5em;
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        font-size: 0.7em;
        width: 50px;
        .name{
          display: block;
          text-align: center;
          margin: 0.5em 0 1.5em 0;
          a{
            color: var(--black);
          }
        }
      }
      li:nth-child(2),
      li:nth-child(5){
        margin: 0 1em;
      }
    }
  }
`