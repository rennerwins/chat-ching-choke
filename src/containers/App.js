import React, { Component } from 'react'
import { firebaseApp, facebookProvider } from '../utils/firebase'
import styled from 'styled-components'
import * as api from '../utils/api'
import { Switch, Route, Redirect } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import Admin from './admin/Admin'
import Navbar from '../components/Navbar'

const Body = styled.div`
	height: 90vh;
	margin-top: 10vh;
`

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
		lastName: '',
		coupon: 0,
		cantPlay: false
	}

	componentDidMount() {
		this.checkAuth()
	}

	checkAuth = () => {
		firebaseApp.auth().onAuthStateChanged(user => {
			if (user) {
				window.localStorage.setItem('isLoggedIn', true)
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
				api.addNewUserFromWeb(uid, user.uid).then(res => {
					if (res.error_code === 5555) {
						this.setState({ cantPlay: true })
					} else {
						let { PSID, firstName, lastName, coupon } = res
						this.setState({
							PSID,
							firstName,
							lastName,
							coupon,
							cantPlay: false
						})
					}
				})
			} else {
				this.setState({
					isLogin: false,
					displayName: '',
					email: '',
					avatar: '',
					uid: '',
					isAdmin: false,
					fbid: '',
					cantPlay: false
				})
			}
		})
	}

	checkAdmin = uid => {
		firebaseApp.database().ref(`webAdmin/${uid}`).once('value', snapshot => {
			if (snapshot.val()) {
				this.setState({ isAdmin: true })
				window.localStorage.setItem('isAdmin', true)
			} else {
				this.setState({ isAdmin: false })
				window.localStorage.removeItem('isAdmin')
			}
		})
	}

	facebookLogin = () => {
		firebaseApp.auth().signInWithPopup(facebookProvider).then(res => {
			if (res) {
				this.setState({ isLogin: true })
				window.localStorage.setItem('isLoggedIn', true)
			}
		})
	}

	logout = () => {
		firebaseApp.auth().signOut().then(() => {
			window.localStorage.removeItem('isAdmin')
			window.localStorage.removeItem('isLoggedIn')
		})
	}

	render() {
		let Main = ''
		localStorage.isLoggedIn
			? (Main = <Home userDetails={this.state} />)
			: (Main = <Login facebookLogin={this.facebookLogin} />)
		return (
			<div>
				<Navbar logout={this.logout} isLogin={this.state.isLogin} />
				<Switch>
					<Body className="container">
						<Route exact path="/" render={() => Main} />
						<Route
							path="/quiz"
							render={() => <Quiz userDetails={this.state} />}
						/>
						{/* <Route
							path="/admin"
							render={() => <Admin userDetails={this.state} />}
						/> */}
						<Route
							path="/admin"
							render={() =>
								localStorage.isAdmin
									? <Admin userDetails={this.state} />
									: <Redirect to="/" />}
						/>
					</Body>
				</Switch>
			</div>
		)
	}
}

export default App
