import styled from 'styled-components'

export const SongTableNoAlbumWrapper = styled.div`
  .songs{
    width: 100%;
    border: 1px solid var(--line);
    margin-bottom: 60px;
    table-layout: fixed;
    thead{
      background-image: linear-gradient(var(--ffffff),
      var(--fefefe),var(--fcfcfc),
      var(--f8f8f8),var(--f6f6f6),
      var(--f4f4f4),var(--f2f2f2),var(--f0f0f0));
      tr{
        color: #666;
        font-size: 13px;
        height: 38px;
        th{
          padding: 8px 10px;
        }
        th:nth-child(1){
          width: 10%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(2){
          width: 50%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(3){
          width: 10%;
          border-right: 1px solid var(--line);
        }
        th:nth-child(4){
          width: 30%;
          border-right: 1px solid var(--line);
        }
      }
    }
    tbody{
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
        .mv{
          margin-left: 15px;
          color: #c20c0c;
          font-size: 15px;
          vertical-align: middle;
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