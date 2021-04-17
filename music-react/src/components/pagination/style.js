import styled from 'styled-components'

export const PaginationWrapper = styled.div`
  .pagination{
    display: flex;
    justify-content: center;
    .anticon .anticon-double-left .ant-pagination-item-link-icon{
      color: var(--black);
    }
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link{
      background-color: var(--panel-bg);
      border-color: var(--line);
      span{
        color: var(--black);
      }
      :hover{
        border-color: var(--red);
      }
    }
    .ant-pagination-disabled .ant-pagination-item-link,
    .ant-pagination-disabled .ant-pagination-item-link{
      :hover{
        border-color: var(--line);
      }
    }
    .ant-pagination-item{
      transition: all 0.3s;
      border-color: var(--line);
      background-color: var(--panel-bg);
    }
    .ant-pagination-item{
      a{
        color: var(--black);
      }
      :hover{
        border-color: var(--red);
      }
    }
    .ant-pagination-item-active{
      background-color: var(--red);
      a{
        color: #fff;
      }
    }
  }
`