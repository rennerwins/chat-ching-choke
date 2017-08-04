import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import styled from 'styled-components'
import Button from 'material-ui/Button'

const Span = styled.span`
	color: #fff;
	text-decoration: none;
`

const Navbar = props => {
	return (
		<AppBar position="fixed" style={{ backgroundColor: '#424242' }}>
			<Toolbar>
				<Typography type="title" color="inherit" style={{ flex: 1 }}>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Span>Home</Span>
					</Link>
				</Typography>
				{props.isLogin &&
					<Button onClick={props.logout} color="contrast">
						<Span>Logout</Span>
					</Button>}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
