import styled from 'styled-components'

export const MineWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em 0;
  display: flex;
  justify-content: space-between;
`

export const MineContentLeft = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding-top: 2em;
  padding-bottom: 25em;
  width: 20%;
  .mine-title{
    display: block;
    color: var(--black);
    text-decoration: none;
    font-size: 0.9em;
    padding: 0.6em 0 0.6em 2em;
    font-family: simsun, 宋体;
    font-weight: bold;
    :hover{
      background-color: var(--ranking-left-hover);
    }
  }
  .active{
    background-color: var(--ranking-left-active);
    :hover{
      background-color: var(--ranking-left-active);
    }
  }
`

export const MineContentRight = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  width: 79%;
  padding: 2em;
  padding-bottom: 2em;
`