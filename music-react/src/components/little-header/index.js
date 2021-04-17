import React, { memo } from 'react'
import { Link } from 'react-router-dom';

import {XYLittleHeaderWrapper} from "./style"

export default memo(function XYLittleHeader(props) {
  const { title, keywords, keywordClick, line } = props;
  return (
    <XYLittleHeaderWrapper line={line}>
      <div className="title select">{title}</div>
      <div className="keyword">
          {
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <span className="link" onClick={e => keywordClick(item)}>{item}</span>
                </div>
              )
            })
          }
        </div>
    </XYLittleHeaderWrapper>
  )
})
