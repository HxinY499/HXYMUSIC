import styled from 'styled-components'

export const RankingWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`

export const RankingContentLeft = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding-top: 15px;
  width: 240px;
  .ranking-title{
    color: var(--black);
    padding-left: 20px;
    font-size: 15px;
    font-family: simsun, 宋体;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 15px;
  }
  .ranking-wrapper{
    .ranking-item{
      display: block;
      display: flex;
      padding: 10px 0 10px 20px;
      text-decoration: none;
      :hover{
        background-color: var(--ranking-left-hover);
      }
      .ranking-cover{
        margin-right: 10px;
      }
      .ranking-item-info{
        display: flex;
        flex-direction: column;
        .ranking-item-name{
          color: var(--black);
          margin-bottom: 2px;
        }
        .ranking-item-update{
          color: #999999;
        }
      }
    }
    .active-link{
      background-color: var(--ranking-left-active);
      :hover{
        background-color: var(--ranking-left-active);
      }
    }
  }
`

export const RankingContentRight = styled.div`
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  width: 730px;
`