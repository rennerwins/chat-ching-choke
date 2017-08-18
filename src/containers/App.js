import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import Admin from './admin/Admin'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { getUserDetail, checkAdmin, facebookLogin, logout } from '../actions'

const Body = styled.div`
	height: 90vh;
	margin-top: 10vh;
`

class App extends Component {
	componentDidMount() {
		this.props.getUserDetail()
	}

	render() {
		let Main = ''
		this.props.user.isLogin ? (Main = <Home />) : (Main = <Login />)

		return (
			<div>
				<Navbar
					logout={this.props.logout}
					isLogin={this.props.user.isLogin}
				/>
				<Switch>
					<Body className="container">
						<Route exact path="/" render={() => Main} />
						<Route path="/quiz" component={Quiz} />
						{this.props.user.isAdmin && this.props.user.isLogin
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
		getUserDetail,
		checkAdmin,
		facebookLogin,
		logout
	})(App)
)
