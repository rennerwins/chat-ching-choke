import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UserAvatar from './UserAvatar'
import UserDisplayName from './UserDisplayName'
import UserEmail from './UserEmail'
import UserCoupon from './UserCoupon'

const UserProfileWrapper = styled.div`
	padding: 16px;
	margin-top: 15px;
`

const UserProfileCard = props => {
	let { avatar, displayName, email, coupon } = props.user

	return (
		<UserProfileWrapper>
			<UserAvatar avatar={avatar} alt="user-avatar" />

			<UserDisplayName displayName={displayName} />

			<UserEmail email={email} />

			<UserCoupon coupon={coupon} />
		</UserProfileWrapper>
	)
}

UserProfileCard.propTypes = {
	userDetails: PropTypes.object
}

export default UserProfileCard
