import React from 'react'
import styled from 'styled-components'

const LogoImage = styled.img`
	width: auto;
	max-width: 250px;
	margin-top: 20px;
`

const Logo = () => {
	return (
		<LogoImage
			src="https://firebasestorage.googleapis.com/v0/b/codelab-a8367.appspot.com/o/CCC-QR.jpg?alt=media&token=f100975e-4886-4689-8a98-48ba58087ddb"
			alt="logo"
		/>
	)
}

export default Logo
