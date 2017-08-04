import React, { Component } from 'react'
import { firebaseApp, facebookProvider } from '../utils/firebase'
import styled from 'styled-components'
import * as api from '../utils/api'
import { Link, Switch, Route } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import Admin from './admin/Admin'
import AppBar from 'material-ui/AppBar'

const Body = styled.div`height: 100vh;`

class App extends Component {
	state = {
		isLogin: false,
		displayName: '',
		email: '',
		avatar: '',
		isLoading: true,
		uid: '',
		fbid: '',
		isAdmin: false,
		PSID: '',
		firstName: '',
		lastName: ''
	}

	componentDidMount() {
		this.checkAuth()
	}

	checkAuth = () => {
		firebaseApp.auth().onAuthStateChanged(user => {
			if (user) {
				let { displayName, email, photoURL, uid } = user.providerData[0]
				this.setState({
					isLogin: true,
					displayName,
					email,
					avatar: photoURL,
					fbid: uid,
					uid: user.uid
				})
				this.checkAdmin(user.uid)
				api
					.addNewUserFromWeb(uid, user.uid)
					.then(({ PSID, firstName, lastName }) => {
						this.setState({
							PSID,
							firstName,
							lastName
						})
					})
			} else {
				this.setState({
					isLogin: false,
					displayName: '',
					email: '',
					avatar: '',
					uid: '',
					isAdmin: false,
					fbid: ''
				})
			}
		})
	}

	checkAdmin = uid => {
		firebaseApp.database().ref(`webAdmin/${uid}`).once('value', snapshot => {
			snapshot.val()
				? this.setState({ isAdmin: true })
				: this.setState({ isAdmin: false })
		})
	}

	facebookLogin = () => {
		firebaseApp.auth().signInWithPopup(facebookProvider).then(res => {
			res && this.setState({ isLogin: true })
		})
	}

	render() {
		let Main = ''
		this.state.isLogin
			? (Main = <Home userDetails={this.state} />)
			: (Main = <Login facebookLogin={this.facebookLogin} />)
		return (
			<div>
				<AppBar position="static" color="default">
					<Link to="/">
						<h3>Home</h3>
					</Link>
				</AppBar>
				<Switch>
					<Body className="container">
						<Route exact path="/" render={() => Main} />
						<Route
							path="/quiz"
							render={() => <Quiz userDetails={this.state} />}
						/>
						<Route
							path="/admin"
							render={() => <Admin userDetails={this.state} />}
						/>
					</Body>
				</Switch>
			</div>
		)
	}
}

export default App
