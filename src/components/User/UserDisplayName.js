import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

UserDisplayName.propTypes = {
	displayName: PropTypes.string.isRequired
}

export default UserDisplayName
