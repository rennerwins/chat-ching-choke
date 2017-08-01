import React from 'react'
import styled from 'styled-components'

const LogoImage = styled.img`
	width: auto;
  max-width: 200px;
  padding-top: 100px;
`

const Logo = () => {
	return (
		<LogoImage
			src="https://firebasestorage.googleapis.com/v0/b/codelab-a8367.appspot.com/o/chat-ching-choke.png?alt=media&token=10673117-902e-4013-a6a2-0cc9b821dc04"
			alt="logo"
		/>
	)
}

export default Logo
