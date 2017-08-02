import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserProfileCard from '../components/UserProfileCard'
import SectionDivider from '../components/SectionDivider'
import Button from 'material-ui/Button'
import styled from 'styled-components'
import { firebaseApp } from '../utils/firebase'
import { Redirect } from 'react-router-dom'

const Span = styled.span`
	text-decoration: underline;
	color: #757575;
	font-size: 14px;
`

class Home extends Component {
	static propTypes = {
		userDetails: PropTypes.object
	}

	state = {
		playing: false
	}

	componentDidMount() {
		firebaseApp.database().ref('playing').on('value', snapshot => {
			this.setState({ playing: snapshot.val() })
		})
	}

	logout = () => {
		firebaseApp.auth().signOut().then(() => {
			setTimeout(() => {
				return <Redirect push to="/" />
			}, 3000)
		})
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 text-center">
					<UserProfileCard userDetails={this.props.userDetails} />
					<SectionDivider />
				</div>

				<div className="col-12 text-center mt-4">
					{this.state.playing
						? <Button raised color="primary">
								เข้าร่วมกิจกรรม
							</Button>
						: <Button raised disabled>
								กิจกรรมยังไม่เริ่ม
							</Button>}
				</div>

				<div className="col-12 text-center fixed-bottom mb-4">
					<Button>
						<Span onClick={this.logout}>ออกจากระบบ</Span>
					</Button>
				</div>
			</div>
		)
	}
}

export default Home
