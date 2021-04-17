import styled from "styled-components"

export const XYFooterWrapper = styled.div`
background-color: #242424;
  width: 100%;
  height: 249px;
  border-top: 1px solid var(--line);
  .content{
    padding-top: 50px;
    .top{
      width: 100%;
      text-align: center;
      span{
        display: inline-block;
        line-height: 20px;
        color: #fff;
      }
    }
    .center{
      width: 100%;
      text-align: center;
      margin-top: 10px;
      color: #999;
      div:nth-child(2){
        line-height: 60px;
        .item{
          display: inline-block;
          width: 35px;
          line-height: 35px;
          text-align: center;
          border-radius: 50%;
          background-color: var(--panel-bg);
          cursor: pointer;
          background-color: #232a31;
          margin-right: 10px;
          font-size: 20px;
          transition: all 0.3s;
          :hover{
            background-color: #000;
            color: #fff;
          }
        }
      }
    }
    .bottom{
      width: 100%;
      text-align: center;
      margin-top: 35px;
      padding-top: 15px;
      border-top: 1px solid #333333;
      color: #999;
    }
  }
`