import styled from 'styled-components'

export const XYPlayerWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  .collectModal{
    height: 300px;
    overflow: auto;
    .playlist-item{
      display: flex;
      border-bottom: 1px solid var(--line);
      padding: 10px 10px;
      cursor: pointer;
      :hover{
        background-color: var(--ranking-left-hover);
      }
      :last-child{
        border-bottom: none;
      }
      .cover{
        height: 50px;
        width: 50px;
        img{
          width: 100%;
        }
      }
      .detail{
        margin-left: 20px;
        div{
          color: var(--black);
          :last-child{
            margin-top: 6px;
          }
        }
      }
    }
  }
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position:relative;
      width: 206px;
      height: 240px;
      img{
        margin: 34px;
        margin-top: 37px;
        width: 131px;
        border-radius: 50%;
      }
      .top{
        position: absolute;
        width: 206px;
        height: 205px;
        background-position: -140px -580px;
        img{
          width: 100%;
        }
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
        .right{
          display: ${props => {
            if(props.mv === 0){
              return "none"
            }else{
              return "inline-block"
            }
          }};
          font-size: 25px;
          color: #c20c0c;
          cursor: pointer;
        }
        h1{
          margin: 0 15px 0 10px;
          color: var(--black);
        }
      }
      .singer-name{
        span{
          display: block;
          width: 100%;
          height: 16px;
          margin: 10px 0;
          color: #999;
          a{
            color: #0c73c2;
          }
        }
      }
      .control{
        margin-bottom: 30px;
      }
      .lyric{
        color: #666666;
        span{
          display: inline-block;
          margin: 3px 0;
        }
        .bottom{
          display: ${props => (props.more ? "block" : "none")};
        }
        .more{
          cursor: pointer;
          color: #0c73c2;
          margin-top: 15px;
        }
      }
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
  .similarity-song{
    position: sticky;
    top: 44px;
    padding: 10px 20px;
    background-color: var(--panel-bg);
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    .title{
      color: var(--black);
      font-size:13px;
      line-height:30px;
      font-weight: 600;
      border-bottom: 1px solid var(--line);
      margin-bottom: 15px;
    }
    .song-list{
      .item{
        display: flex;
        justify-content: space-between;
        width: 200px;
        height: 35px;
        margin-bottom: 15px;
        .info{
          width: 155px;
          .artist-name{
            display: block;
            font-size:12px;
            color: #999;
          }
        }
        .control{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 40px;
          height: 32px;
          font-size: 12px;
          color:#999;
          i{
            transform: scale(0.8);
            cursor: pointer;
          }
          .fa-play{
          }
        }
      }
    }
  }
`