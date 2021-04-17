import React, { memo } from 'react'
import { Pagination } from 'antd'
import { PaginationWrapper } from './style'

export default memo(function XYPagination(props) {
  const pageSize = props.pageSize
  const total = props.total
  const pageChange = props.pageChange
  const currentPage = props.currentPage
  return (
    <PaginationWrapper>
      <Pagination className="pagination" current={currentPage} 
      total={total || 1} 
      defaultPageSize={pageSize}
      showSizeChanger={false}
      onChange={pageChange}/>
    </PaginationWrapper>
  )
})
