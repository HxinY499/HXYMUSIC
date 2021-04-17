import styled from 'styled-components'

export const XYPlayerWrapper = styled.div`
  display: flex;
  padding: 10px 0;
`

export const XYPlayerLeftContent = styled.div`
  width: 710px;
  padding: 33px 30px 40px 36px;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  .song-detail{
    display: flex;
    justify-content:space-between;
    margin-bottom: 20px;
    .image{
      width: 210px;
      height: 177px;
      margin-top: 3px;
      background-position: 0 -986px;
      img{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .detail{
      width: 414px;
      .song-name{
        display: flex;
        align-items: center;
        width: 100%;
        height: 32px;
        .left{
          display: inline-block;
          width: 54px;
          height: 24px;
          line-height: 24px;
          background-color: #c20c0c;
          border-radius: 5px;
          font-size: 13px;
          text-align: center;
          color: #fff;
        }
        h1{
          font-size: 20px;
          margin: 0 15px 0 10px;
          color: var(--black);
        }
      }
      .other{
        margin: 10px 0 20px 0;
        div{
          margin-bottom: 5px;
          color: #666666;
        }
        .artist{
          a{
            color: #0c73c2;
          }
        }
      }
      .control{
        margin-bottom: 30px;
        .collect{
          display: none;
        }
      }
    }
  }
  .introduce{
    margin-bottom: 50px;
    span.title{
      color: var(--black);
      font-weight: 600;
    }
    div{
      color: #666;
      margin-top: 10px;
    }
  }

  .sc-Axmtr{
    .right{
      display: none;
    }
  }
`

export const XYPlayerRightContent = styled.div`
  padding-left: 10px;
  .similarity-playlist{
    position: sticky;
    top: 44px;
    padding: 10px 20px;
    background-color: var(--panel-bg);
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    .title{
      font-size:13px;
      line-height:30px;
      font-weight: 600;
      border-bottom: 1px solid var(--line);
      margin-bottom: 15px;
      color: var(--black);
    }
    .playlist-list{
      .item{
        display: flex;
        margin-bottom: 15px;
        .info{
          display: flex;
          flex-direction: column;
          width: 140px;
          padding-left: 8px;
          .playlist-name{
            color: var(--black);
            font-size: 15px;
          }
          .time{
            color: #999;
          }
        }
      }
    }
  }
`