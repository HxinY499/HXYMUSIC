import styled from 'styled-components'

export const UserDataWrapper = styled.div`
  background-image: url(${require("@/assets/img/earth.jpg").default});
  background-attachment: fixed;
  width: 100%;
  background-size: 100%;
  background-position: 0 -4em;
  font-size: 1rem;
  h2{
    font-size: 1.5em;
    color: #999;
    font-family: simsun, 宋体;
    font-weight: 700;
  }
  .data{
    font-size: 1.5em;
    margin: 0 0.2em;
    font-family: simsun, 宋体;
    font-weight: 700;
    color: #fff;
    transition: color 0.3s;
    :hover{
      color: var(--red);
    }
  }
  .little-data{
    font-size: 1.2em;
    margin: 0 0.2em;
    font-family: simsun, 宋体;
    font-weight: 700;
    transition: color 0.3s;
    color: #fff;
    :hover{
      color: var(--red);
    }
  }
  .title{
    font-size: 1.5em;
    color: #999;
    margin-bottom: 1em;
    font-family: simsun, 宋体;
    font-weight: 700;
  }
  .content{
    font-size: 1em;
    color: #999;
    font-family: simsun, 宋体;
    font-weight: 700;
  }
  .chart{
    margin: 20px 0;
  }
  .end{
    padding-bottom: 250px;
  }
`

export const NotShowWrapper = styled.div`
  font-family: simsun, 宋体;
  font-weight: 700;
  color: var(--black);
  font-size: 3em;
  text-align: center;
  padding: 2em 0 12em 0;
  span{
    display: block;
    color: var(--red);
    font-size: 2em;
    margin-bottom: 0.5em;
  }
`