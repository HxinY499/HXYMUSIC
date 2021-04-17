import styled from 'styled-components'

export const ChangeCoverWrapper = styled.div`
  height: 300px;
  padding-top: 60px;
  text-align: center;
  position: relative;
  .ant-upload{
    width: 150px;
    height: 150px;
    :hover{
      border-color: #242424;
    }
  }
  .tip{
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
    color: #999999;
  }
`