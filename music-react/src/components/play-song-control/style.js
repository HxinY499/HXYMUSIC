import styled from 'styled-components'

export const PlaySongControlWrapper = styled.div`
  display:flex;
  .btn{
    padding-top: 0;
    padding-bottom: 0;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
    display: inline-block;
    line-height: 31px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    i{
      margin-right: 6px;
      color: #999;
    }
  }
  .play-button{
    padding: 0;
    border-radius: 6px;
    width: 80px;
    background-color: #1890ff;
    color: white;
    :hover{
      background-color: #40a9ff;
    }
    span{
      font-size: 15px;
      margin-right: 10px;
    }
  }
  .play-button2{
    background-color: #1890ff;
    color: white;
    transform: translateX(-15px);
    box-shadow: 3px 0 5px 0 rgba(0,0,0,0.1);
    border-left: 1px solid #999;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
    :hover{
      background-color: #40a9ff;
    }
    span{
      font-size: 14px;
    }
  }
  .btn2{
    background-color: var(--btn-detail);
    :hover{
      background-color: var(--btn-detail-hover);
    }
  }
  button:nth-child(3),
  button:nth-child(4),
  button:nth-child(5){
    padding-left: 10px;
    padding-right: 10px;
  }
  .fa-plus-square-o{
    font-weight: 900;
  }
  .share-modal{
    .text-area{
      font-size: 1rem;
      width: 100%;
      height: 6em;
      padding: 1em;
      background-color: #fff;
      border: 1px solid var(--line);
      font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji", -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif!important;
    }
    .share-info{
      padding: 0.5em 0.5em;
      background-color: var(--table-body1);
      color: #666;
    }
    .share-control{
      font-size: 1.5em;
      i{
        display: inline-block;
        padding: 0.3em 0.5em;
        padding-left: 0;
        cursor: pointer;
        color: #666;
        :hover{
          color: var(--red);
        }
      }
    }
    .submit{
      font-size: 1em;
      padding: 0.5em 1.5em;
      margin-top: 0.5em;
      color: #fff;
      background-color: #242424;
      cursor: pointer;
    }
    .emoji-search{display: none;}
    ul::before,
    .content-wrapper::before,
    .skin-tones-list{
      display: none;
    }
  }
`