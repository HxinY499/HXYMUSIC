import styled from "styled-components"

export const PassProtectWrapper = styled.div`
  .ant-steps{
    margin-top: 40px;
    margin-bottom: 50px;
  }
  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after{
    background-color: #42ca6b;
  }
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon{
    background-color: #42ca6b;
    border-color: #42ca6b;
  }
  .ant-steps-item-finish .ant-steps-item-icon{
    border-color: #42ca6b;
    .ant-steps-icon{
      color: #42ca6b;
    }
  }
  .steps-content{
    margin: 0 auto;
    width: 400px;
    height: 400px;
    .setForm{
      .set-button{
        background-color: #242424;
        color: #fff;
        height: 40px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 20px;
        width: 400px;
        border-radius: 5px;
      }
    }
    .success{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 280px;
      justify-content: space-around;
      .suc-title{
        display: inline-block;
        font-size: 20px;
      }
      .suc-icon{
        font-size: 100px;
        color: #42ca6b;
      }
      .suc-btn{
        display: inline-block;
        width: 200px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
`