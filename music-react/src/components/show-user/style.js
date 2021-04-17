import styled from 'styled-components'

export const ShowUserWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1rem;
  .avatar{
    width: 3.75em;
    height: 3.75em;
    a{
      display: block;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .detail{
    margin-left: 1em;
    .nickname{
      font-size: 0.9em;
      a{
        color: var(--font-blue);
      }
      i{
        margin-left: 1em;
      }
      .male{
        color: #26a6e4;
      }
      .female{
        color: #ffb5d3;
      }
    }
    ul.social{
      display: flex;
      padding: 0.2em 0;
      li{
        font-size: 0.7em;
        padding-right: 0.8em;
        padding-left: 0.8em;
        border-right: 1px solid var(--line);
        :first-child{
          padding-left: 0;
        }
        :last-child{
          border-right: none;
        }
        a{
          span{
            color: var(--black);
          }
          color: var(--font-blue);
        }
      }
    }
    .desc{
      font-size: 0.7em;
      color: #666;
      width: 20em;
    }
  }
  .control-btn{
    margin-left: auto;
    .btn{
      display: none;
    }
    .other-btn{
      button:first-child{
        display: inline-block;
      }
    }
  }
`