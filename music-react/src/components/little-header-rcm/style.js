import styled from "styled-components"

export const XYLitteHeaderWrapper = styled.div`
  display: flex;
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  padding: 0 10px 4px 5px;
  background-position: -225px -156px;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    .little-header-icon{
      display: inline-block;
      box-sizing: content-box;
      margin-right: 6px;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      border: 5px solid #c20c0c;
    }
    .title {
      font-size: 20px;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
      margin-right: 20px;
      color: var(--black);
    }

    .keyword {
      display: flex;

      .item {
        .divider {
          margin: 0 15px;
          color: var(--line);
        }
        .link{
          cursor: pointer;
          color: var(--black);
          :hover{
            color: #c20c0c;
          }
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      font-weight: 900;
      color: #c20c0c;
    }
  }
`