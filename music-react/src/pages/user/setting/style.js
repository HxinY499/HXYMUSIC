import styled from "styled-components"

export const UserSettingWrapper = styled.div`
  width: 980px;
  margin: 15px auto 10px auto;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 30px;
  .title{
    font-size: 20px;
    font-weight: 400;
    border-left: 4px solid #c20c0c;
    padding-left: 15px;
    margin-bottom: 25px;
    color: var(--black);
  }
  .menu{
    display: flex;
    width: 100%;
    border-bottom: 3px solid #c20c0c;
    background-color: var(--rcm-carousel);
    li{
      a{
        display: inline-block;
        line-height: 40px;
        width: 150px;
        text-align: center;
        color: var(--black);
        font-size: 14px;
        text-decoration: none;
        transition: all 0.2s;
      }
      a:hover,a.active{
        background-color: #242424;
        color: #fff;
      }
    }
  }
  .ant-form-item label,
  .ant-steps-item-finish .ant-steps-item-container .ant-steps-item-title,
  .ant-steps-item-active .ant-steps-item-container .ant-steps-item-title,
  .suc-title{
    color: var(--black);
  }
  
`