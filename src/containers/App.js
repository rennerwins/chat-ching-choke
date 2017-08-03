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
		isLoading: true
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
				let { displayName, email, photoURL } = user.providerData[0]
				setTimeout(() => {
					this.setState({
						isLogin: true,
						displayName,
						email,
						avatar: photoURL
					})
				}, 1500)
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
			res && this.setState({ isLogin: true })
		})
	}

	render() {
		let Main = ''
		if (this.state.isLoading) {
			Main = (
				<div className="row align-items-center main">
					<div className="col text-center">
						<h1>แชท ชิง โชค</h1>
						<div className="loading-line"></div>
						<div className="loading-percent"></div>
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
