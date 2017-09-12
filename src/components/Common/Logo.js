import React from 'react'
import styled from 'styled-components'
import QR from '../../image/CCC-QR.jpg'

const LogoImage = styled.img`
	width: auto;
	max-width: 250px;
	margin-top: 20px;
`

const Logo = () => {
	return (
		<LogoImage
			src={QR}
			alt="logo"
		/>
	)
}

export default Logo
