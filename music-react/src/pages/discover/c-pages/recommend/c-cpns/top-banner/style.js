import styled from 'styled-components'

export const XYTopBannerWrapper = styled.div`
  background: url(${props => props.bgImage}) center center/6000px;

  .banner{
    display: flex;
    position: relative;
    height: 300px;
  }
`

export const XYTopBannerContent = styled.div`
  width: 100%;

  .banner-item{
    overflow: hidden;
    height: 300px;
    .image{
      width: 100%;
      height:100%;
    }
  }
`

export const XYTopBannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-10px);

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require("@/assets/img/banner_sprite.png").default});
    background-color: transparent;
    cursor: pointer;
    transform: translateY(-20px);

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`