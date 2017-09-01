import React from 'react'
import UserAvatar from './UserAvatar'
import Card, { CardContent } from 'material-ui/Card'

const UserWinner = props => {
	const { coupon, user, firstPrize, start } = props
	return (
		<div>
			<Card className="user-card animated bounceIn">
				<CardContent>
					<h4>{coupon}</h4>
					<UserAvatar avatar={user.profilePic} firstPrize={firstPrize} start={start} />
					<h3 className="mt-3">{user.firstName}</h3>
					<h3>{user.lastName}</h3>
				</CardContent>
			</Card>
		</div>
	)
}

export default UserWinner
