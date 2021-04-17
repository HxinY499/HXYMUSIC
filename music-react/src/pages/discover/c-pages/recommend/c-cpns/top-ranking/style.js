import styled from 'styled-components';

export const TopRankingWrapper = styled.div`
  background-image: url(${props => props.bg});
  /* background-size: 1500px 1500px; */
  background-size: 600px 600px;
  background-position: 0 0;
  width: 220px;
  transition: all 0.5s;
  :hover{
    background-size: 700px 700px;
    background-position: -30px -50px;
  }
  .header{
    width: 100%;
    padding-top: 25px;
    .info{
      width: 100%;
      text-align: center;
      
      .name{
        letter-spacing: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #242424;
        text-decoration: none;
      }
      .control{
        opacity: 0;
        transition: all 0.4s;
        transform: scale(0.5);
        display: block;
        border-radius: 50%;
        background-color: var(--panel-bg);
        width: 30px;
        height: 30px;
        margin: 0 auto;
        margin-top: 10px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .list{
    .list-item{
      width: 100%;
      height: 36px;
      color: #242424;
      display: flex;
      .rank{
        line-height: 36px;
        margin-left: 25px;
        font-size: 15px;
        width: 25px;
      }
      .info{
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
      }
      .song{
        line-height: 36px;
        cursor: pointer;
        width: 100px;
        color: #242424;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .item-control{
        display: none;
        padding-right: 20px;
        line-height: 36px;
        .fa-plus{
          margin-left: 15px;
        }
        i{
          cursor: pointer;
        }
      }
      :hover{
        .item-control{
          display: block;
        }
      }
    }
  }
  :hover .header .control{
    opacity: 1;
    transform: scale(1);
  }
`