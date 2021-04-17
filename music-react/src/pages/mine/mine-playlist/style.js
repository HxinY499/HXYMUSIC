import styled from 'styled-components'

export const MinePlaylistWrapper = styled.div`
  font-size: 1rem;
  .edit{
    .nav-bar{
      margin-bottom: 2em;
      span{
        font-family: simsun, 宋体;
        font-weight: bold;
        font-size: 1em;
        color: var(--black);
      }
      span:first-child{
        color: var(--font-blue);
        cursor: pointer;
        :hover{
          text-decoration: underline;
        }
      }
      i{
        margin: 0 1em;
        color: #999;
      }
    }
  }
  .mine-wrapper{
    position: relative;
    margin-bottom: 3em;
    .add-playlist{
      position: absolute;
      right: 0;
      top: 0;
      padding: .5em 1em;
      cursor: pointer;
      background-color: var(--btn-detail);
      :hover{
        background-color: var(--btn-detail-hover);
      }
      i{
        font-weight: bold;
        color: var(--red);
        margin-right: 0.5em;
      }
    }
    .no-data{
      font-family: simsun, 宋体;
      font-weight: bold;
      text-align: center;
      color: #666;
      margin-top: 1em;
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.77em;
      li{
        margin: 1em 1.77em;
        position: relative;
        .handle{
          position: absolute;
          font-size: 1.4em;
          top: 0;
          right: -1.2em;
          background-color: rgba(0,0,0,0.4);
          opacity: 0;
          border-radius: 0 0.3em 0.3em 0;
          transition: all 0.3s;
          i{
            display: block;
            padding: 0.2em;
            cursor: pointer;
            :first-child{
              border-bottom: 1px solid var(--black);
            }
          }
        }
        :hover{
          .handle{
            right: -1.4em;
            opacity: 1;
          }
        }
      }
    }
  }
  .like-wrapper{
    .content{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.77em;
      li{
        margin: 1em 1.77em;
        position: relative;
        .handle{
          position: absolute;
          font-size: 1.4em;
          top: 0;
          right: -1em;
          background-color: rgba(0,0,0,0.4);
          opacity: 0;
          border-radius: 0 0.3em 0.3em 0;
          transition: all 0.3s;
          i{
            display: block;
            padding: 0.2em;
            cursor: pointer;
          }
        }
        :hover{
          .handle{
            right: -1.2em;
            opacity: 1;
          }
        }
      }
    }
  }
  .add-playlst-modal{
    .add-playlist-form{
      .ant-form-item-required::before{
        display: none;
      }
      button{
        width: 10em;
        margin-top: 2em;
      }
    }
  }
`