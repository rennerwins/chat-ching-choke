import React from 'react'
import styled from 'styled-components'

const Avatar = styled.img`
	width: 30px;
	height: 30px;
`

const SmallAvatar = props => {
	return <Avatar className="animated fadeIn" src={props.src} />
}

export default SmallAvatar
