import styled from 'styled-components'

export const CurrentRankingWrapper = styled.div`
  font-size: 1rem;
  padding: 2em 2em;
  .current-ranking-info{
    display: flex;
    margin-bottom: 2em;
    .current-ranking-cover{
      width: 10em;
      height: 10em;
      border: 1px solid var(--line);
      text-align: center;
      img{
        margin-top: 0.25em;
        vertical-align: middle;
      }
    }
    .current-ranking-detail{
      padding: 0.5em 2em;
      .current-ranking-name{
        font-size: 1.2em;
        color: var(--black);
      }
      .current-ranking-update{
        font-size: 0.8em;
        color: #999;
        margin-top: 0.6em;
        span{
          margin-right: 0.25em;
        }
        .current-ranking-update-time{
          color: var(--black);
        }
      }
      .current-ranking-description{
        margin-top: 0.5em;
        font-size: 0.9em;
        color: var(--black);
        width: 30em;
      }
      .current-ranking-control{
        margin-top: 1em;
        .collect{
          display: none;
        }
      }
    }
  }
  .current-ranking-songs{
    width: 100%;
    border: 1px solid var(--line);
    margin-bottom: 3.75em;
    table-layout: fixed;
    thead{
      background-image: linear-gradient(var(--ffffff),
      var(--fefefe),var(--fcfcfc),
      var(--f8f8f8),var(--f6f6f6),
      var(--f4f4f4),var(--f2f2f2),var(--f0f0f0));
      tr{
        color: #666;
        font-size: 0.8125em;
        height: 38px;
        th{
          padding: 8px 10px;
        }
        th:nth-child(1){
          width: 7%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(2){
          width: 43%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(3){
          width: 10%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(4){
          width: 20%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(5){
          width: 20%;
        }
      }
    }
    tbody{
      font-size: 0.8em;
      tr{
        height: 29.6px;
        td{
          padding: 6px 10px;
          color: var(--black);
          a{
            color: var(--black);
          }
        }
        td:nth-child(1){
          color: #a599a5;
          text-align: center;
        }
        #hot-td2{
          img{
            margin-right: 20px;
          }
        }
        #hot-td3{
          .item-control{
            line-height: 65px;
          }
        }
        .mv{
          margin-left: 15px;
          color: #c20c0c;
          font-size: 15px;
          vertical-align: middle;
        }
        td:nth-child(3){
          position: relative;
          .item-control{
            position: absolute;
            display: none;
            width: 92px;
            line-height: 29.6px;
            top: 0;
            left: 0;
            z-index: 9;
            color: #999;
            background-color: transparent;
            i{
              cursor: pointer;
              margin-top: 6px;
              margin-left: 10px;
            }
            i:hover{
              color: #616161;
            }
          }
        }
        :hover{
          .item-control{
            display: inline-block !important;
          }
          .show-time{
            display: none;
          }
        }
      }
      tr:nth-child(2n){
        background-color: var(--table-body1);
      }
      tr:nth-child(2n+1){
        background-color: var(--table-body2);
      }
    }
  }
`