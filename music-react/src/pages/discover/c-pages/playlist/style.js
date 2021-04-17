import styled from 'styled-components'

export const PlaylistWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em 0;
  position: relative;
  
  .category{
    display: flex;
    width: 100%;
    font-size: 0.9em;
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    overflow: hidden;
    .swich-category{
      padding: 0.625em 1.1em 0.625em 1em;
      background-color: var(--red);
      color: #fff;
      cursor: pointer;
      .category-name{
        margin-right: 0.625em;
      }
    }
    .hot-category{
      display: flex;
      padding: 0.625em 0;
      color: var(--black);
      margin-left: 1em;
      .item{
        margin: 0 0.8em;
        cursor: pointer;
      }
      .title{
        margin-left: 0;
      }
    }
    .order{
      display: flex;
      justify-content: space-around;
      padding: 0.4em 0;
      margin-left: auto;
      margin-right: 1em;
      width: 9em;
      span{
        display: block;
        padding: 0.225em 0.8em;
        border-radius: 0.425em;
        background-color: var(--btn-detail);
        cursor: pointer;
      }
      .active-order{
        background-color: var(--red);
        color: #fff;
      }
    }
  }
  .playlists-wrapper{
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    margin-top: 1em;
    padding: 2em 1.5em;
    .playlists{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin: 0 0.5em 1.5em 0.5em;
      }
    }
  }
  //分类面板过渡动画
  .show-categoryPanel-enter,
  .show-categoryPanel-appear {
    opacity: 0;
    transform: translateY(1em);
  }

  .show-categoryPanel-enter-active,
  .show-categoryPanel-appear-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }

  .show-categoryPanel-exit {
    opacity: 1;
  }

  .show-categoryPanel-exit-active {
    opacity: 0;
    transform: translateY(1em);
    transition: opacity 500ms, transform 500ms;
  }
`