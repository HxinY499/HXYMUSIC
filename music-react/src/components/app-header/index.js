import React, { memo, useEffect, useState } from 'react'
import {NavLink, useHistory} from "react-router-dom"
import {SearchOutlined} from "@ant-design/icons"
import { useSelector, useDispatch } from 'react-redux'

import {headerLinks} from "@/common/local-data"
import {getSearchResultAction} from '@/pages/search/store'
import {
  XYHeaderWrapper,
  XYHeaderContentLeft,
  XYHeaderContentRight
} from "./style.js"
import { Input } from 'antd'
import { CSSTransition } from 'react-transition-group';
import XYLogin from '@/pages/user/login'
import XYAppHeaderAvatar from '@/pages/user/app-header-avatar'

export default memo(function XYAppHeader() {
  const [searchHistory, setSearchHistory] = useState((JSON.parse(sessionStorage.getItem("serachHistory"))) || []);
  const [inputFocus, setInputFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const state = useSelector(state => ({
    loginUser: state.getIn(["user", "loginUser"])
  }))
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(JSON.stringify(state.loginUser) === "{}"){
      setIsLogin(false)
    }else{
      setIsLogin(true)
    }
  },[state.loginUser])

  const showSlectItem = (item, index) => {
    return (
      <NavLink to={item.link} className="">
        {item.title}
        <i className="icon sprite_01"></i>
      </NavLink>
    )  
  }
  document.getElementById("main-search")?.addEventListener("focus", ()=>{
    setInputFocus(true);
  })
  document.getElementById("main-search")?.addEventListener("blur", ()=>{
    setInputFocus(false);
  })
  function inputChange(value){
    setSearchValue(value.target.value);
  }
  function searchEnter(e){
    let keywords = e.target.value.trim()
    dispatch(getSearchResultAction(keywords))
    history.push(`/search?keywords=${keywords}`)
    if(!searchHistory.includes(keywords)){
      let arr = searchHistory
      arr.unshift(keywords)
      setSearchHistory(arr)
      sessionStorage.setItem("serachHistory", JSON.stringify(arr));
    }
  }
  function searchWithHistory(keyword){
    setSearchValue(keyword);
    dispatch(getSearchResultAction(keyword));
    history.push(`/search?keywords=${keyword}`);
  }
  
  return (
    <XYHeaderWrapper>
      <div className="content wrap-v1">
        <XYHeaderContentLeft>
          <a href="#/" className="logo">HXYMUSIC</a>
          <div className="left-content">
            {
              headerLinks.map((item, index) => {
                return (
                  <div key={index} className="left-item">
                    {showSlectItem(item, index)}
                  </div>
                )
              })
            }
          </div>
        </XYHeaderContentLeft>
        <XYHeaderContentRight>
          <Input className="search"
            id="main-search"
            placeholder="音乐/歌单/用户"
            prefix={<SearchOutlined />}
            allowClear={true}
            onPressEnter={searchEnter}
            autoComplete="off"
            onChange={inputChange}
            value={searchValue}/>
          <div className="user">
            {
              isLogin ? 
              <div className="tip"><XYAppHeaderAvatar></XYAppHeaderAvatar></div> : 
              <XYLogin btnTitle="登录"></XYLogin>
            }
          </div>
        </XYHeaderContentRight>
      </div>
      <div className="bottom"></div>
      <CSSTransition in={inputFocus} classNames="show-input-panel" timeout={1000} unmountOnExit={true}>
      <div className="search-panel">
        {
          searchHistory?.length>0 ?
          (
            searchHistory?.slice(0,5)?.map((item, index) => {
              return <span 
                        className="search-item" 
                        key={index} 
                        onClick={()=>{searchWithHistory(item)}}
                        title={`搜索 ${item}`}>{item}</span>
            })
          ) :
          <span>暂无搜索记录</span>
        }
        
      </div>
      </CSSTransition>
    </XYHeaderWrapper>
  )
})