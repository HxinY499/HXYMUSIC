import styled from 'styled-components'

export const XYLittleHeaderWrapper = styled.div`
  text-align: center;
  
  .title{
    font-size: 25px;
    font-weight: 900;
    letter-spacing:13px
  }
  .keyword{
    width: 60%;
    margin: 10px auto 0 auto;
    padding-bottom: ${props => props.line+"px"};
    border-bottom: 2px solid #c20c0c;
    display: flex;
    justify-content: space-between;
    .item{
      font-size: 14px;
      cursor: pointer;
      :hover{
        color: #c20c0c;
      }
    }
  }
`