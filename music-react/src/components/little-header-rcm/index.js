import React, { memo } from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {XYLitteHeaderWrapper} from "./style"

const XYLittleHeaderRCM = memo(function(props) {

  const { title, keywords, moreLink, keywordClick } = props;
  const { isMore } = props;

  return (
    <XYLitteHeaderWrapper>
      <div className="left">
        <span className="little-header-icon"></span>
        <h3 className="title select">{title}</h3>
        <div className="keyword">
          {
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <span className="link" onClick={e => keywordClick(item)}>{item}</span>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        isMore && 
        <div className="right">
          <Link to={moreLink}>更多</Link>
          <i className="fa fa-arrow-right icon"></i>
        </div>
      }
      
    </XYLitteHeaderWrapper>
  )
})

XYLittleHeaderRCM.defaultProps = {
  keywords: []
}

XYLittleHeaderRCM.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array
}

export default XYLittleHeaderRCM
