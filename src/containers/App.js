import React, { Component } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import { firebaseApp, facebookProvider } from '../utils/firebase'

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
		isAdmin: false
	}

	componentDidMount() {
		this.checkAuth()

		setTimeout(() => {
			this.setState({ isLoading: false })
		}, 2000)
	}

	checkAuth = () => {
		firebaseApp.auth().onAuthStateChanged(user => {
			if (user) {
				let { displayName, email, photoURL, uid } = user.providerData[0]
				setTimeout(() => {
					this.setState({
						isLogin: true,
						displayName,
						email,
						avatar: photoURL,
						fbid: uid,
						uid: user.uid
					})
					this.checkAdmin(user.uid)
				}, 1500)
			} else {
				this.setState({
					isLogin: false,
					displayName: '',
					email: '',
					avatar: '',
					uid: '',
					isAdmin: false
				})
			}
		})
	}

	checkAdmin = uid => {
		firebaseApp.database().ref(`test/${uid}`).on('value', snapshot => {
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
		if (this.state.isLoading) {
			Main = (
				<div className="row align-items-center main">
					<div className="col text-center pl-0">
						<h1>แชท ชิง โชค</h1>
						<div className="loading-line" />
						<div className="loading-percent" />
					</div>
				</div>
			)
		} else {
			this.state.isLogin
				? (Main = <Home userDetails={this.state} />)
				: (Main = <Login facebookLogin={this.facebookLogin} />)
		}

		return (
			<Body className="container">
				{Main}
			</Body>
		)
	}
}

export default App
