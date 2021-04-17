import React, { memo, useState, useEffect } from 'react'
import classnames from 'classnames'

import {CategoryPanelWrapper} from './style'
import {GlobalOutlined,HighlightOutlined,CoffeeOutlined,SmileOutlined,SkinOutlined} from '@ant-design/icons'

export default memo(function XYCategoryPanel(props) {
  const allCategory = props.allCategory
  const [categorySub, setCategorySub] = useState(null)
  const changeCategory = props.changeCategory

  useEffect(() => {
    let categoriesArr = [[],[],[],[],[]]
    allCategory.sub && allCategory.sub.forEach(item => {
      switch (item.category) {
        case 0:
          categoriesArr[0].push(item)
          break;
        case 1:
          categoriesArr[1].push(item)
          break;
        case 2:
          categoriesArr[2].push(item)
          break;
        case 3:
          categoriesArr[3].push(item)
          break;
        case 4:
          categoriesArr[4].push(item)
          break;
        default:
          break;
      }
    })
    setCategorySub(categoriesArr)
  }, [allCategory.sub])

  return (
    <CategoryPanelWrapper>
      <li className="category-wrapper">
        <div className="category-title"><GlobalOutlined />{allCategory.categories&&allCategory.categories["0"]}</div>
        <ul className="category-content">
          {
            categorySub&&categorySub[0].map(item => {
              return (<li key={item.name} onClick={()=>{changeCategory(item.name)}}
              className={classnames({"active-category":props.showCat===item.name})}>{item.name}</li>)
            })
          }
        </ul>
      </li>
      <li className="category-wrapper">
        <div className="category-title"><HighlightOutlined />{allCategory.categories&&allCategory.categories["1"]}</div>
        <ul className="category-content">
          {
            categorySub&&categorySub[1].map(item => {
              return (<li key={item.name} onClick={()=>{changeCategory(item.name)}}
              className={classnames({"active-category":props.showCat===item.name})}>{item.name}</li>)
            })
          }
        </ul>
      </li>
      <li className="category-wrapper">
        <div className="category-title"><CoffeeOutlined />{allCategory.categories&&allCategory.categories["2"]}</div>
        <ul className="category-content">
          {
            categorySub&&categorySub[2].map(item => {
              return (<li key={item.name} onClick={()=>{changeCategory(item.name)}}
              className={classnames({"active-category":props.showCat===item.name})}>{item.name}</li>)
            })
          }
        </ul>
      </li>
      <li className="category-wrapper">
        <div className="category-title"><SmileOutlined />{allCategory.categories&&allCategory.categories["3"]}</div>
        <ul className="category-content">
          {
            categorySub&&categorySub[3].map(item => {
              return (<li key={item.name} onClick={()=>{changeCategory(item.name)}}
              className={classnames({"active-category":props.showCat===item.name})}>{item.name}</li>)
            })
          }
        </ul>
      </li>
      <li className="category-wrapper">
        <div className="category-title"><SkinOutlined />{allCategory.categories&&allCategory.categories["4"]}</div>
        <ul className="category-content">
          {
            categorySub&&categorySub[4].map(item => {
              return (<li key={item.name} onClick={()=>{changeCategory(item.name)}}
              className={classnames({"active-category":props.showCat===item.name})}>{item.name}</li>)
            })
          }
        </ul>
      </li>
    </CategoryPanelWrapper>
  )
})
