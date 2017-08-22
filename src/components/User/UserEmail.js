import React from 'react'
import styled from 'styled-components'

const Email = styled.p`
	margin-top: 0;
	margin-bottom: 0;
	color: #757575;
	font-size: 14px;
`

const UserEmail = ({ email }) => {
	return (
		<Email>
			{email}
		</Email>
	)
}

export default UserEmail
