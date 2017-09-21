import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

const styles = {
	faIcon: {
		fontSize: '18px'
	}
}

const Span = styled.span`margin-left: 10px;`

const FacebookLogin = ({ facebookLogin, text }) => {
	return (
		<Button raised color="primary" onClick={facebookLogin}>
			<i
				className="fa fa-facebook-official"
				aria-hidden="true"
				style={styles.faIcon}
			/>{' '}
			<Span>{text}</Span>
		</Button>
	)
}

FacebookLogin.propTypes = {
	facebookLogin: PropTypes.func,
	text: PropTypes.string.isRequired
}

export default FacebookLogin
