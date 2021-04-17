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
    margin-bottom: 60px;
    .image{
      width: 210px;
      height: 210px;
      margin-top: 3px;
      border: 1px solid var(--line);
      text-align: center;
      
      img{
        display: inline-block;
        margin-top: 4px;
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
      .creator{
        display:flex;
        height: 40px;
        align-items: center;
        margin: 15px 0 15px 0;
        .avatar{
          width: 38px;
          height: 38px;
          margin-right: 15px;
          img{
            width: 100%;
          }
        }
        .name{
          color: #0c73c2;
          line-height: 40px;
          margin-right: 15px;
        }
        .time{
          color: #9999a6;
          line-height: 40px;
        }
      }
      .control{
        margin-bottom: 20px;
        .collect{
          display: none;
        }
      }
      .tags-wrapper{
        color: #666;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .tags{
          display: flex;
          li{
            /* border: 1px solid var(--line); */
            padding: 2px 12px;
            border-radius: 20px;
            background-color: var(--panel-bg);
            margin-right: 10px;
            box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
            a{
              display: block;
              width: 100%;
              height: 100%;
              text-decoration: none;
            }
          }
        }
      }
      .introduce{
        color: #666666;
      }
    }
  }

  .sc-Axmtr{
    .right{
      display: none;
    }
  }
  .no-data{
    font-family: simsun, 宋体;
    font-weight: bold;
    text-align: center;
    font-size: 1rem;
    color: #666;
    margin-top: 1em;
    margin-bottom: 2em;
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
      color: var(--black);
      border-bottom: 1px solid var(--line);
      margin-bottom: 15px;
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
          .creator{
            color: #999;
            span{
              color: var(--black);
            }
          }
        }
      }
    }
  }
`