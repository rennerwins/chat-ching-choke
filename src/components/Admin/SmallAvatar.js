import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Avatar = styled.img`
	width: 30px;
	height: 30px;
`

const SmallAvatar = props => {
	return <Avatar className="animated fadeIn" src={props.src} />
}

SmallAvatar.propTypes = {
	src: PropTypes.string.isRequired
}

export default SmallAvatar
