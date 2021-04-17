import styled from 'styled-components'

export const XYShowAlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 118px;
  height: 142px;
  .top{
    position: relative;
    height: 70.42%;
    width: 100%;
    a{
      position: absolute;
      width: 84.74%;
      height: 100%;
      z-index:9;
      img{
      transition: all 0.4s;
      }
      .control{
        opacity: 0;
        position: absolute;
        transition: all 0.4s;
        z-index:99;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: rgba(0,0,0,0.2);
        span{
          display:inline-block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          transition: 0.4s;
          text-align: center;
          background-color: var(--panel-bg);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          line-height: 30px;
          transform: scale(0.5);
          font-size: 10px;
          i{
            transform: translateX(1px);
          }
        }
      }
      :hover img{
        transform: scale(1.1);
      }
      :hover .control{
        opacity: 1;
      }
      :hover .control span{
        transform: scale(1.3);
      }
    }
    .image_cover{
      width: 100%;
      height: 100%;
      background-position: 0 -570px;
    }
  }  
  a{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .center{
    font-size: 12px;
    color: var(--black);
  }
  .bottom{
    font-size: 12px;
    color: #666;
  }
`