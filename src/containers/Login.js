import React, { Component } from 'react'
import Title from '../components/Common/Title'
import FacebookLogin from '../components/User/FacebookLogin'
import { connect } from 'react-redux'
import { facebookLogin } from '../modules/user'

class Login extends Component {
	state = {
		title: 'แชท ชิง โชค'
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

export default connect(null, { facebookLogin })(Login)
