import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import Admin from './admin/Admin'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { getUserDetails, checkAdmin, facebookLogin, logout } from '../modules/user'

const Body = styled.div`
	margin-top: 4.5rem;
`

class App extends Component {
	componentDidMount() {
		this.props.getUserDetails()
	}

	render() {
		return (
			<div>
				<Navbar logout={this.props.logout} isLogin={this.props.user.isLogin} />
				
				<Switch>
					<Body className="container">
						{localStorage.isLogin !== undefined
							? <Route exact path="/" component={Home} />
							: <Route exact path="/" component={Login} />}

						<Route path="/quiz" component={Quiz} />

						{localStorage.isAdmin && localStorage.isLogin
							? <Route path="/admin" component={Admin} />
							: <Redirect to="/" />}
					</Body>
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default withRouter(
	connect(mapStateToProps, {
		getUserDetails,
		checkAdmin,
		facebookLogin,
		logout
	})(App)
)
