import styled from 'styled-components'

export const XYSearchWrapper = styled.div`
  font-size: 1rem;
  margin: 0.8em auto 0.5em auto;
  padding: 2em;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  .content{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -2.48em;
    li{
      margin: 1em 2.48em;
    }
  }
  .artist{
    margin: 0 -1.98em;
    li{
      margin: 0 1.98em;
    }
  }
  .playlist{
    margin: 0 -1.77em;
    li{
      margin: 1em 1.77em;
    }
  }
  .ant-tabs-nav::before{
    border-color: var(--line) !important;
  }
  .ant-tabs-tab{
    background-color: var(--panel-bg) !important;
    color: var(--black);
    border-color: var(--line) !important;
  }
  .ant-tabs-tab-active{
    background-color: var(--ranking-left-active) !important;
  }
  .no-data{
    font-size: 1.5em;
    padding: 6em 0;
    text-align: center;
  }
`