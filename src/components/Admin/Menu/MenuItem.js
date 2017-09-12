import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MenuLink = styled(Link)`
	color: #aaa;
	width: 100%;
	&:hover {
		text-decoration: none;
		color: black;
	}
`
const MenuLinkWrapper = styled.div`
	text-align: left;
	width: 100%;
	padding-top: 14px;
	padding-bottom: 14px;
	&:hover {
    color: black;
    background-color: #f1f1f1;
    box-shadow: 2px 0px 10px rgba(0,0,0,0.4);
	}
`
const LinkText = styled.h6`text-decoration: none;`

const MenuItem = ({ to, text }) => {
	return (
		<MenuLinkWrapper className="col-12">
			<MenuLink to={to}>
				<LinkText className="mb-0">{text}</LinkText>
			</MenuLink>
		</MenuLinkWrapper>
	)
}

export default MenuItem
