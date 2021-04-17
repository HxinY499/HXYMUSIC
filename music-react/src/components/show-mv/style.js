import styled from 'styled-components'

export const XYShowWrapper = styled.div`
  font-size: 1rem;
  width: 8.56em;
  .cover{
    position: relative;
    width: 100%;
    height: 6.43em;
    border: 1px solid var(--line);
    a{
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      img{
        transition: all 0.4s;
      }
      .control{
        position: absolute;
        width: 2.2em;
        height: 2.2em;
        border-radius: 50%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border: 4px solid rgba(204, 204, 204, 0.8);
        text-align: center;
        i{
          color: rgba(204, 204, 204, 0.8);
        }
        :hover{
          border-color: rgba(238, 238, 238, 0.8);
          i{
            color: rgba(238, 238, 238, 0.8);
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
    a{
      color: var(--black);
      font-size: 14px;
    }
  }
` 