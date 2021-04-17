import styled from 'styled-components'

export const AvatarWrapper = styled.div`
  width: 36px;
  position: relative;
  :hover .top-avatar{
    transform: scale(1.5) translateY(10px)
  }
  :hover .user-content{
    visibility: visible;
    opacity: 1;
    top: 38px;
  }
  .top-avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    z-index: 1021;
    img{
      width: 100%;
      vertical-align: top;
    }
  }
  .user-content{
    display: block;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.9);
    position: absolute;
    transition: all 0.2s;
    visibility: hidden;
    border-radius: 2px;
    opacity: 0;
    z-index: 1020;
    left: -107.5px;
    top: 34px;
    width: 250px;
    height: 350px;
    background-color: #2b2b2b;
    ul.menu li.item{
      transition: all 0.2s;
      cursor: pointer;
      font-size: 13px;
      color: #cccccc;
      line-height: 40px;
      padding-left: 20px;
      span{
        margin-right: 20px;
        font-size: 14px;
      }
      :hover{
        background-color: #353535;
      }
    }
    ul.menu li:nth-child(1){
      margin-top: 15px;
    }
    ul.menu li:nth-child(3){
      margin-bottom: 15px;
    }
    .nickname{
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .fans{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 50px;
      margin-bottom: 10px;
      color: #cccccc;
      cursor: pointer;
      .left, .right{
        display: flex;
        flex-direction: column;
        transition: all 0.2s;
        span{
          display: block;
          display: inline-block;
          line-height: 20px;
          width: 100px;
          text-align: center;
        }
        span:nth-child(2){
          font-size: 15px;
          font-weight: 600;
        }
        :hover{
          color: #c20c0c;
        }
      }
    }
    .exit{
      cursor: pointer;
      transition: all 0.2s;
      padding-left: 20px;
      font-size: 13px;
      line-height: 40px;
      margin-top: 15px;
      color: #ccc;
      span{
        margin-right: 20px;
        font-size: 14px;
      }
      :hover{
        background-color: #353535;
      }
    }
    .line{
      width: 100%;
      height: 1px;
      background-color: #333333;
    }
  }
`