import React, { Component } from 'react'
import Title from '../components/Title'
import FacebookLogin from '../components/FacebookLogin'
import PropTypes from 'prop-types'

class Login extends Component {
	state = {
		title: 'แชท ชิง โชค'
	}
	static propTypes = {
		facebookLogin: PropTypes.func.isRequired
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<Title title={this.state.title} />
					</div>
				</div>

				<div className="row mt-2">
					<div className="col text-center">
						<FacebookLogin
							text="เข้าสู่ระบบด้วย Facebook"
							facebookLogin={this.props.facebookLogin}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
