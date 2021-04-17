import styled from "styled-components"

export const TestWrapper = styled.div`
  margin-top: 30px;
  .test-little-title{
    font-size: 14px;
    font-family: simsun, 宋体;
    color: var(--black);
    font-weight: 700;
    margin-bottom: 20px;
    padding-left: 5px;
    .return{
      color: #0c73c2;
      cursor: pointer;
      margin-right: 10px;
      :hover{
        text-decoration: underline;
      }
    }
    .icon{
      color: #a69999;
      font-size: 12px;
      margin-right: 10px;
    }
  }
  .test-title{
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    color: var(--black);
  }
  .test-content{
    border-top: 1px solid var(--line);
    li{
      position: relative;
      border-bottom: 1px solid var(--line);
      height: 150px;
      line-height: 150px;
      .test-item-content{
        position: absolute;
        left: 125px;
        top: 50%;
        transform: translateY(-50%);
        span:first-child{
          color: var(--black);
        }
        span{
          display: block;
          line-height: 30px;
        }
        span:first-child{
          font-size: 18px;
          font-family: simsun, 宋体;
          font-weight: 700;
        }
        span:nth-child(2){
          color: #6d757a;
        }
      }
      .test-item-icon{
        position: absolute;
        display: inline-block;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 35px;
        border: 2px solid #0c73c2;
        color: #0c73c2;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
      }
      .test-item-control{
        position: absolute;
        line-height: 1;
        display: inline-block;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 100px;
        height: 40px;
        font-size: 14px;
        background-color: #0c73c2;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
      .test-item-call{
        position: absolute;
        display: inline-block;
        line-height: 30px;
        color: #0c73c2;
        cursor: pointer;
        right: 20px;
        font-size: 13px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`