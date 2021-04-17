import styled from 'styled-components'

export const AppWrapper = styled.div`
  
  transition: all 0.2s;
  background-color: var(--main-bg);
  .main-button{
    height: 40px;
    width: 40px;
    position: fixed;
    bottom: 100px;
    right: 5%;
    line-height: 40px;
    border-radius: 4px;
    background-color: var(--panel-bg);
    color: #666666;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .show-playBar{
    position: fixed;
    z-index: 99;
    bottom:-53px;
    left: 0;
    right: 0;
    opacity: 0;
    transition: all 0.3s;
  }
  #show-playBar-active{
    opacity: 1;
    bottom: 0;
  }
  /* 回到顶部 */
  .back-top {
    bottom: 200px;
  }
  .switch-playbar {
    bottom: 100px;
  }
  .theme{
    bottom: 150px;
  }
  .marin-load{
    font-size: 50em;
    width: 60em;
    margin: 10em auto;
  }

  /* playBar切换按钮过渡动画 */
  .show-switch-playBar-enter,
  .show-switch-playBar-appear {
    opacity: 0;
    transform: scale(0.8);
  }

  .show-switch-playBar-enter-active,
  .show-switch-playBar-appear-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .show-switch-playBar-exit {
    opacity: 1;
  }

  .show-switch-playBar-exit-active {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 300ms, transform 300ms;
  }

`