import React from 'react'
import Card, { CardContent } from 'material-ui/Card'
import styled from 'styled-components'
import ImageBorder from '../../image/gold-border.png'

const Avatar = styled.img`
	width: 125px;
	height: 125px;
	border-radius: 50%;
	text-align: center;
	margin-top: 15px;
	opacity: ${props => (props.firstPrize && props.start ? 0.4 : 1)};
`

const AvatarBorder = styled.img`
	position: absolute;
	top: 13px;
	left: 70px;
	width: 165px;
	height: 165px;
	margin-bottom: 15px;
`

const UserWinner = ({ coupon, user, firstPrize, start }) => {
	return (
		<div>
			<Card className="user-card animated bounceIn">
				<CardContent>
					<AvatarBorder src={ImageBorder} />
					<Avatar src={user.profilePic} firstPrize={firstPrize} start={start} />
					{coupon < 10 && <h3 className="mt-4">000{coupon}</h3>}
					{coupon < 100 && <h3 className="mt-4">00{coupon}</h3>}
					{coupon < 1000 && <h3 className="mt-4">0{coupon}</h3>}
					{coupon >= 1000 && <h3 className="mt-4">{coupon}</h3>}
				</CardContent>
			</Card>
		</div>
	)
}

export default UserWinner
