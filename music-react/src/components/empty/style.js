import styled from 'styled-components'

export const EmptyWrapper = styled.div`
  height: 500px;
  display: flex;
  padding-top: 60px;
  height: 550px;
  flex-direction: column;
  align-items: center;
  .empty-icon{
    font-size: 80px;
    color: var(--black);
  }
  #empty-title{
    margin-top: 20px;
    font-size: 50px;
    font-weight: 700;
    color: #c20c0c;
  }
  #empty-title1{
    /* margin-top: 20px; */
    font-size: 30px;
    color: var(--black);
  }
  #empty-title2{
    font-size: 20px;
    color: var(--black);
  }
`