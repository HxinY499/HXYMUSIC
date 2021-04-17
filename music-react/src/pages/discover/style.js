import styled from "styled-components"

export const XYDiscoverHeaderWrapper = styled.div`
  height: 34px;
  background-color: #c20c0c;
  position: sticky;
  top: -1px;
  z-index: 999;
  .content{
    height:100%;
    .list{
      display: flex;
      position: sticky;
      top: 0px;
      height:100%;
      margin-left: 165px;
      a{
        display: block;
        height: 100%;
        font-size: 12px;
        text-decoration: none;
        color: #fff;
        span{
          display: block;
          transition:all 0.2s;
          line-height: 20px;
          padding: 0 13px;
          margin: 7px 17px 0 17px;
          border-radius: 20px;
        }
        &.active span,
        &:hover span{
          background-color:#9b0909;
        }
      }
    }
  }
`