import React, { Component } from 'react'
import * as api from '../../utils/api'
import styled from 'styled-components'

const Avatar = styled.img`
	position: relative;
	opacity: 1;
	width: 160px;
	height: 160px;
	border-radius: 80px;
	text-align: center;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), 0px 2px 10px rgba(0, 0, 0, 0.5);
	margin-bottom: 16px;
`

const Username = styled.p`
	text-align: center;
	font-size: 26px;
`

class AdminWinner extends Component {
	state = {
		topUsers: []
	}

	componentDidMount() {
		api.getTopUsers().then(({ topUsers }) => {
			this.setState({
				topUsers
			})
		})
	}

	render() {
		return (
			<div className="row mt-3">
				{this.state.topUsers.map(
					(data, index) =>
						index < 3 &&
						<div className="col-4 text-center" key={index}>
							<h1>อันดับ {index + 1}</h1>
							<Avatar src={data.profilePic} alt="avatar-image" />
							<Username>
								{data.firstName} {data.lastName}
							</Username>
						</div>
				)}
			</div>
		)
	}
}

export default AdminWinner
