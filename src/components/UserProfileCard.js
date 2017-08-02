import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UserAvatar = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50px;
	text-align: center;
	margin-top: 50px;
`

const UserDisplayName = styled.h2`
	margin-top: 16px;
	font-size: 20px;
`

const UserEmail = styled.p`
	margin-top: 0;
	margin-bottom: 0;
	color: #757575;
	font-size: 14px;
`

const UserCoupon = styled.span`
	margin-top: 0px;
	color: #424242;
	font-weight: 500;
`

const UserProfileCard = props => {
	let { avatar, displayName, email } = props.userDetails

	return (
		<div className="row">
			<div className="col text-center">
				<UserAvatar src={avatar} alt="user-avatar" />
				<UserDisplayName>
					{displayName}
				</UserDisplayName>
				<UserEmail>
					{email}
				</UserEmail>
				<UserCoupon>
					จำนวนคูปอง : <i className="fa fa-ticket" aria-hidden="true" /> 100
				</UserCoupon>
			</div>
		</div>
	)
}

UserProfileCard.propTypes = {
	userDetails: PropTypes.object
}

export default UserProfileCard
