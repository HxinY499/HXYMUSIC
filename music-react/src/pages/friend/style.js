import styled from 'styled-components'

export const FriendWrapper = styled.div`
  font-size: 1rem;
  padding: 0.625em;
  display: flex;
  justify-content: space-between;
`

export const PostWrapper = styled.div`
  width: 72.5%;
  background-color: var(--panel-bg);
  border-radius: 0.625em;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  padding: 1.2em 2.2em;
  .post-title{
    font-size: 1.4em;
    color: var(--black);
    padding: 0.1em 0;
    border-bottom: 2px solid var(--red);
  }
  .posts{
    
  }
`

export const UserWrapper = styled.div`
  width: 26.6%;
  .user{
    position: sticky;
    top: 0.3em;
    width: 100%;
    background-color: var(--panel-bg);
    border-radius: 0.625em;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    padding: 2.2em 2.2em;
    .user-main{
      span:first-child{
        display: inline-block;
        width: 3.5em;
        height: 3.5em;
        border: 1px solid var(--line);
        padding: 0.1em;
        a{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
          }
        }
      }
      span:last-child{
        font-weight: 600;
        margin-left: 0.5em;
        a{
          display: inline-block;
          width: 7em;
          color: var(--black);
        }
      }
    }
    ul.user-social{
      display: flex;
      width: 100%;
      margin-top: 1.5em;
      li{
        flex: 1;
        border-right: 1px solid var(--line);
        padding-left: 1em;
        :last-child{
          border-right: none;
        }
        :first-child{
          padding-left: 0;
        }
        a{
          text-decoration: none;
          .social-count{
            display: block;
          }
          span{
            color: var(--black);
          }
          :hover span{
            color: var(--red);
          }
        }
      }
    }
  }
`