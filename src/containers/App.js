import React, { Component } from 'react'
import Logo from '../components/Logo'
import FacebookLogin from '../components/FacebookLogin'
import styled from 'styled-components'
import { firebaseApp, facebookProvider } from '../utils/firebase'

const Body = styled.div`height: 100vh;`

const Title = styled.h1`
	font-weight: 700;
	text-shadow: 2px 2px 6px #9e9e9e;
`

class App extends Component {
  state = {
    loggedIn: false,
    displayName: '',
    email: '',
    avatar: ''
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  facebookLogin = () => {
    firebaseApp.auth().signInWithPopup(facebookProvider).then(({ user }) => {
      let { displayName, email, photoURL } = user
      this.setState({
        displayName,
        email,
        avatar: photoURL
      })
    })
  }

	render() {
		return (
			<Body className="container">
				<div className="row">
					<div className="col-12 image-logo">
						<Logo />
						<Title>Chat Ching Choke</Title>
					</div>
				</div>
				<FacebookLogin signIn={this.facebookLogin} />
			</Body>
		)
	}
}

export default App
