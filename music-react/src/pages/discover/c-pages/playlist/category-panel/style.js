import styled from 'styled-components'

export const CategoryPanelWrapper = styled.ul`
  position: absolute;
  z-index: 100;
  top: 3.5em;
  width: 45em;
  height: 25em;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  overflow: auto;
  padding: 1.25em;
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
  .category-wrapper{
    margin-bottom: 0.625em;
    .category-title{
      margin-bottom: 0.725em;
      font-weight: bold;
      span{
        margin-right: 0.625em;
      }
    }
    .category-content{
      display: flex;
      flex-wrap: wrap;
      li{
        font-size: 0.8em;
        background-color: var(--btn-detail);
        border-radius: 1.2em;
        padding: 0.3em 0.9em;
        margin-right: 0.8em;
        cursor: pointer;
        margin-bottom: 0.8em;
        transition: all 0.3s;
        :hover{
          background-color: var(--red);
          color: #fff;
        }
      }
      .active-category{
        background-color: var(--red);
        color: #fff;
      }
    }
  }
`