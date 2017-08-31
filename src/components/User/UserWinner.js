import React from 'react'
import styled from 'styled-components'
import UserAvatar from './UserAvatar'

const UserWinner = props => {
	const { coupon, user } = props
	return (
		<div>
			<h1>{coupon}</h1>
			<UserAvatar avatar={user.profilePic} />
			<h2>
				{user.firstName} {user.lastName}
			</h2>
		</div>
	)
}

export default UserWinner
