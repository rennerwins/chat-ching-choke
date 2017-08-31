import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`

const Avatar = styled.img`
	width: 30px;
	height: 30px;
	opacity: 1;
	animation: ${fadeIn} 1.5s ease-in-out;
`

const SmallAvatar = props => {
	return <Avatar src={props.src} />
}

export default SmallAvatar
