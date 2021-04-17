import styled from 'styled-components'

export const PostWrapper = styled.div`
  border-bottom: 1px solid var(--line);
  .main-wrapper{
    display: flex;
    padding: 1.5em 0 3.5em 0;
    position: relative;
    overflow: hidden;
    .avatar{
      display: inline-block;
      width: 3em;
      height: 3em;
      img{width: 100%;}
    }
    .detail{
      margin-left: 1em;
      .title{
        a{
          color: var(--font-blue);
        }
        span{margin-left: 1em;color: #666;}
      }
      .time{font-size: 0.6em;color: #999;}
      .text{color: var(--black);}
      .media{
        display: flex;
        align-items: center;
        padding: 0.8em 0.8em;
        overflow: hidden;
        margin-top: 1em;
        background-color: var(--table-body1);
        .media-cover{
          width: 2.5em;
          height: 2.5em;
          cursor: pointer;
          img{width: 100%;}
        }
        .media-detail{
          margin-left: 1em;
          margin-right: 3em;
          span{
            font-size:0.8em;
            line-height: 1;
            padding: 0.3em 0;
            color: var(--black);
          }
          span:first-child{
            color: var(--red);
          }
          span:nth-child(2){
            margin-left: 1em;
            cursor: pointer;
          }
          span:last-child{
            display: block;
            font-size: 0.8em;
          }
        }
      }
    }
    .img-wrapper{
      display: grid;
      width: 22em;
      height: 22em;
      margin-top: 1em;
      grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: 0.5em;
      .img-item{
        grid-column: span 1;
        grid-row: span 1;
        cursor: pointer;
        .ant-image, .ant-image img{
          width: 100%;
          height: 100%;
        }
        .ant-image img{object-fit:cover;}
      }
    }
    .delete{
      position: absolute;
      right: 0.5em;
      top: 1.6em;
      cursor: pointer;
      color: var(--black);
      :hover{
        color: var(--red);
      }
    }
    .post-bottom-control{
      position: absolute;
      right: 0.5em;
      bottom: 1em;
      i{
        color: var(--font-blue);
        cursor: pointer;
        :hover{
          color: var(--red);
        }
      }
      .already-like{
        color: var(--red);
      }
      i:first-child{
        margin-right: 3.5em;
      }
    }
  }
  .post-comment{
  }
`