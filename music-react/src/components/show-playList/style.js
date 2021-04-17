import styled from 'styled-components'

export const XYShowWrapper = styled.div`
width: ${props => props.long + "px"};
  .cover{
    width: ${props => props.long + "px"};
    height: ${props => props.long + "px"};
    a{
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      img{
        transition: all 0.4s;
        width: 100%;
      }
      .control{
        opacity: 0;
        position: absolute;
        transition: all 0.4s;
        z-index:99;
        width: ${props => props.long + "px"};
        height: ${props => props.long + "px"};
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
          width: ${props => props.long*0.2 + "px"};
          height: ${props => props.long*0.2 + "px"};
          line-height: ${props => props.long*0.2 + "px"};
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
        transform: scale(1.5);
      }
    }
  }
  .info{
    width: 100%;
    margin-top: ${props => props.long*0.05 + "px"};
    a{
      color: var(--black);
      font-size: 14px;
    }
  }
` 