import React, { Component } from 'react'
import Logo from '../components/Logo'
import FacebookLogin from '../components/FacebookLogin'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Title = styled.h1`font-weight: 700;`

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: 'แชท ชิง โชค'
		}
	}
	static propTypes = {
		facebookLogin: PropTypes.func.isRequired
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 image-logo">
						<Logo />
						<Title>
							{this.state.title}
						</Title>
					</div>
				</div>
				<div className="row">
					<div className="col text-center">
						<FacebookLogin text="เข้าสู่ระบบด้วย Facebook" facebookLogin={this.props.facebookLogin} />
					</div>
				</div>
			</div>
		)
	}
}

export default Login
