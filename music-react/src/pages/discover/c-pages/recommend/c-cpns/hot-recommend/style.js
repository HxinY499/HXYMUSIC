import styled from 'styled-components'

export const XYHotRecommendWrapper = styled.div`
  padding: 20px;
  background-color: var(--panel-bg);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
`

export const XYHotRecommendContent = styled.ul`
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
  margin: 20px 0 5px 0;
  .item{
    margin-bottom: 20px;
  }
`