import React from 'react'
import styled from 'styled-components'

const Avatar = styled.img`
width: 100px;
height: 100px;
border-radius: 50px;
text-align: center;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), 0px 2px 10px rgba(0, 0, 0, 0.5);
`

const UserAvatar = ({ avatar }) => {
  return (
    <Avatar src={avatar} alt="user-avatar" />
  )
}

export default UserAvatar
