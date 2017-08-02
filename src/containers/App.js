import React, { Component } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Home from './Home'
import { firebaseApp, facebookProvider } from '../utils/firebase'

const Body = styled.div`height: 90vh;`

class App extends Component {
	state = {
		isLogin: false,
		displayName: '',
		email: '',
		avatar: ''
	}

	componentDidMount() {
		firebaseApp.auth().onAuthStateChanged(user => {
			let { displayName, email, photoURL } = user.providerData[0]
			if (user) {
				this.setState({
					isLogin: true,
					displayName,
					email,
					avatar: photoURL
				})
			} else {
				this.setState({
					isLogin: false,
					displayName: '',
					email: '',
					avatar: ''
				})
			}
		})
	}

	facebookLogin = () => {
		firebaseApp.auth().signInWithPopup(facebookProvider).then(res => {
			if (res) {
				this.setState({
					isLogin: true
				})
			}
		})
	}

	render() {
		return (
			<Body className="container">
				{!this.state.isLogin
					? <Login facebookLogin={this.facebookLogin} />
					: <Home userDetails={this.state} />}
			</Body>
		)
	}
}

export default App
