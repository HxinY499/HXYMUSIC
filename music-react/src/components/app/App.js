import React,{Suspense, useEffect, useState} from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import {renderRoutes} from "react-router-config"
import {BrowserRouter} from "react-router-dom"

import routes from "@/router"

import { AppWrapper } from './style'
import { CSSTransition } from 'react-transition-group';
import { Spin, BackTop } from 'antd';
import { UpOutlined, PlaySquareOutlined } from '@ant-design/icons'
import XYAppHeader from "../app-header";
import XYAppFooter from "../app-footer";
import XYPlayBar from "../../pages/player/play-bar";

export default function App() {
  const state = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"])
  }),shallowEqual);
  const [showPlayBar, setShowPlayBar] = useState(false);
  const [showSwitch, setShowSwitch] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(()=>{
    if(Object.keys(state.currentSong).length > 0){
      setShowPlayBar(true)
      setShowSwitch(true)
    }else{
      setShowPlayBar(false)
      setShowSwitch(false)
    }
  }, [state.currentSong])
  const switchPlaybar = function(){
    setShowPlayBar(!showPlayBar)
  }
  const changeTheme = function(){
    let mainElement = document.documentElement;
    if(darkTheme === true){
      mainElement.style.setProperty("--main-bg", "#f5f5f5")
      mainElement.style.setProperty("--panel-bg", "#fff")
      mainElement.style.setProperty("--line", "#ccc")
      mainElement.style.setProperty("--black", "#000")
      mainElement.style.setProperty("--btn-detail", "#f1f1f1")
      mainElement.style.setProperty("--btn-detail-hover", "#f9f9f9")
      mainElement.style.setProperty("--btn-login-black", "#242424")
      mainElement.style.setProperty("--rcm-carousel", "#f5f5f5")
      mainElement.style.setProperty("--table-body1", "#f7f7f7")
      mainElement.style.setProperty("--table-body2", "#fff")
      mainElement.style.setProperty("--ffffff", "#fff")
      mainElement.style.setProperty("--fefefe", "#fefefe")
      mainElement.style.setProperty("--fcfcfc", "#fcfcfc")
      mainElement.style.setProperty("--fafafa", "#fafafa")
      mainElement.style.setProperty("--f8f8f8", "#f8f8f8")
      mainElement.style.setProperty("--f6f6f6", "#f6f6f6")
      mainElement.style.setProperty("--f4f4f4", "#f4f4f4")
      mainElement.style.setProperty("--f2f2f2", "#f2f2f2")
      mainElement.style.setProperty("--f0f0f0", "#f0f0f0")
      mainElement.style.setProperty("--ranking-left-hover", "#f4f2f2")
      mainElement.style.setProperty("--ranking-left-active", "#e6e6e6")
    }else if(darkTheme === false){
      mainElement.style.setProperty("--main-bg", "#17181a")
      mainElement.style.setProperty("--panel-bg", "#242424")
      mainElement.style.setProperty("--line", "#000")
      mainElement.style.setProperty("--black", "#666")
      mainElement.style.setProperty("--btn-detail", "#666")
      mainElement.style.setProperty("--btn-detail-hover", "#616161")
      mainElement.style.setProperty("--btn-login-black", "#000")
      mainElement.style.setProperty("--rcm-carousel", "#000")
      mainElement.style.setProperty("--table-body1", "#000")
      mainElement.style.setProperty("--table-body2", "#242424")
      mainElement.style.setProperty("--ffffff", "#000000")
      mainElement.style.setProperty("--fefefe", "#000000")
      mainElement.style.setProperty("--fcfcfc", "#000000")
      mainElement.style.setProperty("--fafafa", "#000000")
      mainElement.style.setProperty("--f8f8f8", "#000000")
      mainElement.style.setProperty("--f6f6f6", "#000000")
      mainElement.style.setProperty("--f4f4f4", "#000000")
      mainElement.style.setProperty("--f2f2f2", "#000000")
      mainElement.style.setProperty("--f0f0f0", "#000000")
      mainElement.style.setProperty("--ranking-left-hover", "#202020")
      mainElement.style.setProperty("--ranking-left-active", "#000")
    }
    setDarkTheme(!darkTheme);
  }

  return (
    <AppWrapper id="little-root">
      <BrowserRouter>
        <XYAppHeader/>
        <Suspense fallback={<Spin size="large" className="marin-load"></Spin>}>
          {renderRoutes(routes)}
        </Suspense>
        <XYAppFooter/>
        <div id={showPlayBar ? "show-playBar-active":""} className={"show-playBar"}><XYPlayBar /></div>
      </BrowserRouter>
      <BackTop>
        <div className="back-top main-button" title={"回到顶部"}><UpOutlined /></div>
      </BackTop>
      <div className="theme main-button" onClick={()=>{changeTheme()}}
            title={darkTheme ? "日间模式" : "夜间模式"}>
        {
          darkTheme ? <i className="fa fa-sun-o"></i> : <i className="fa fa-moon-o"></i>
        }
      </div>
      <CSSTransition in={showSwitch} classNames="show-switch-playBar" timeout={1000} unmountOnExit={true}>
        <div className="switch-playbar main-button" onClick={()=>{switchPlaybar()}}
              title={showPlayBar ? "隐藏播放条" : "显示播放条"}>
          <PlaySquareOutlined />
        </div>         
      </CSSTransition>
    </AppWrapper>
  )
}