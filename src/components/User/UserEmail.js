import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

UserEmail.propTypes = {
	email: PropTypes.string
}

export default UserEmail
