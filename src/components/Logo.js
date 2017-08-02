import React from 'react'
import styled, { keyframes } from 'styled-components'

const rocking = keyframes`
	0% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(20deg);
	}
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(-20deg);
	}
	100% {
		transform: rotate(0deg);
	}
`

const LogoImage = styled.img`
	width: auto;
	max-width: 200px;
	padding-top: 100px;
	animation: ${rocking} 3s linear infinite;
`

const Logo = () => {
	return (
		<LogoImage
			src="https://www.nextiva.com/support/wp-content/themes/knowall-Nextiva-2017/img/chat-icon.svg"
			alt="logo"
		/>
	)
}

export default Logo
