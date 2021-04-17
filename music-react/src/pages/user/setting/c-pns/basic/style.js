import styled from 'styled-components'

export const BasicWrapper = styled.div`
  .content{
    width: 920px;
    display: flex;
    padding-top: 30px;
    .detail{
      width: 50%;
    }
    .avatar{
      width: 50%;
      position: relative;
      img.now{
        width: 150px;
        margin-left: 140px;
      }
      .change-avatar{
        width: 150px;
        position: absolute;
        line-height: 20px;
        background-color: #737272;
        color: #fff;
        top: 130px;
        left: 140px;
        text-align: center;
        cursor: pointer;
        :hover{
          text-decoration: underline;
        }
      }
      .changeAvatar{
        .ca-title{
          font-size: 14px;
          font-family: simsun, 宋体;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 20px;
          padding-left: 5px;
          .return{
            color: #0c73c2;
            cursor: pointer;
            margin-right: 10px;
            :hover{
              text-decoration: underline;
            }
          }
          .icon{
            color: #a69999;
            font-size: 12px;
            margin-right: 10px;
          }
        }
      }
    }
  }
`