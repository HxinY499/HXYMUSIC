import styled from "styled-components"

export const PrivateHomeWrapper = styled.div`
  ul{
    margin-top: 30px;
    border-top: 1px solid var(--line);
    li{
      position: relative;
      line-height: 80px;
      border-bottom: 1px solid var(--line);
      padding-left: 20px;
      .icon{
        font-size: 18px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .yes{
        color: #48bd86;
      }
      .no{
        color: #efa957;
      }
      .item-title{
        font-size: 14px;
        color: var(--black);
      }
      .tip{
        position: absolute;
        left: 420px;
        color: #6d757a;
      }
      .control{
        position: absolute;
        right: 30px;
        color: #40a9ff;
      }
      .email{
        color: #6d757a;
      }
      .alert-info{
        display: inline-block;
        margin-left: 20px;
        line-height: 20px;
        border: 1px solid #40a9ff;
        padding: 0 5px 0 5px;
        background-color: rgba(64, 169, 255, 0.3);
      }
    }
  }
`