import React from 'react'
import styled from 'styled-components'

const DisplayName = styled.h2`
	margin-top: 16px;
	font-size: 20px;
`

const UserDisplayName = ({ displayName }) => {
	return (
		<DisplayName>
			{displayName}
		</DisplayName>
	)
}

export default UserDisplayName
