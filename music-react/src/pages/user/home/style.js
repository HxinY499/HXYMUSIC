import styled from 'styled-components'

export const UserHomeWrapper = styled.div`
  font-size: 1rem;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 2.5em;
  margin: 0.625em auto;
  .info-wrapper{
    display: flex;
    justify-content: space-between;
    .avatar{
      width: 11.875em;
      height: 11.875em;
      margin-top: 0.1875em;
      border: 1px solid var(--line);
      text-align: center;
      
      img{
        display: inline-block;
        margin-top: 0.25em;
      }
    }
    .detail{
      width: 41.875em;
      .title{
        position: relative;
        font-size: 1.5em;
        border-bottom: 1px solid var(--line);
        color: var(--black);
        padding: 0.1em 0 .5em 0;
        i{
          margin-left: 1em;
        }
        .male{
          color: #26a6e4;
        }
        .female{
          color: #ffb5d3;
        }
        .this-btn{
          position: absolute;
          font-size: 0.4em;
          right: 0;
          padding: 0.8em 1.3em;
          top: 1em;
          border-radius: 0.5em;
          background-color: var(--btn-detail);
          cursor: pointer;
          box-shadow: 0 0 0.2em rgba(0,0,0,0.5);
          :hover{
            background-color: var(--btn-detail-hover);
          }
        }
        .like-btn{
          position: absolute;
          font-size: 0.4em;
          right: 0;
          top: 1em;
          .other-btn{
            button:first-child{
              border-radius: 0.5em;
              background-color: var(--btn-detail);
              box-shadow: 0 0 0.2em rgba(0,0,0,0.5);
              padding-right: 1.3em;
              :hover{
                background-color: var(--btn-detail-hover);
              }
            }
          }
        }
        .btn{
          display: none;
        }
        .other-btn button:first-child{
          display: inline-block;
        }
      }
      ul.social{
        display: flex;
        li{
          padding-right: 1.5em;
          font-size: 1.8em;
          color: #666;
          transition: color 0.2s;
          a{
            display: block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            :hover{
              color: var(--red);
            }
          }
          span{
            font-size: 0.5em;
            transform: translateY(-0.6em);
            display: block;
          }
        }
      }
      .city{
        font-size: 0.8em;
        color: #555;
        margin-bottom: 0.8em;
        span:nth-child(2)::after{
          content: '-';
          display: inline-block;
        }
      }
      .desc{
        font-size: 0.8em;
        color: #555;
      }
    }
  }
  .child-router{
    padding-top: 3em;
    padding-bottom: 10em;
  }
  .no-data{
    font-family: simsun, 宋体;
    font-weight: bold;
    text-align: center;
    color: #666;
    margin-top: 1em;
  }
  .show-user-body{
    display: flex;
    width: 100%;
    margin-top: 2em;
    flex-wrap: wrap;
    li.show-user-body-item{
      width: 50%;
      padding: 1.5em 1.5em;
      transition: all 0.3s;
      :hover{
        box-shadow: 0 0 0.5em rgba(0,0,0,0.3);
      }
    }
  }
`

export const UserHomeLikeWrapper = styled.div``

export const UserHomeFocusWrapper = styled.div``

export const UserHomeFansWrapper = styled.div``

export const UserHomePostWrapper = styled.div``