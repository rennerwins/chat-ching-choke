import React from 'react'
import styled from 'styled-components'

const FacebookButton = styled.button`
	color: white;
	background-color: #2962ff;
	font-size: 14px;
	padding: 20px;
	border: none;
	border-radius: 0;
	width: 100%;
	outline-color: rgba(0, 0, 0, 0);
	&:focus {
		outline-color: rgba(0, 0, 0, 0);
	}
`

const Span = styled.span`margin-left: 6px;`

const FacebookLogin = props => {
	return (
		<div className="fixed-bottom">
			<FacebookButton onClick={props.signIn}>
				<i className="fa fa-facebook-official" aria-hidden="true" />{' '}
				<Span>เข้าสู่ระบบด้วย Facebook</Span>
			</FacebookButton>
		</div>
	)
}

export default FacebookLogin
