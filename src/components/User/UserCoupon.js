import React from 'react'
import styled from 'styled-components'

const Coupon = styled.span`
	margin-top: 0px;
	color: #424242;
	font-weight: 500;
`

const UserCoupon = ({ coupon }) => {
	return (
		<Coupon>
			จำนวนคูปอง : <i className="fa fa-ticket" aria-hidden="true" /> {coupon}
		</Coupon>
	)
}

export default UserCoupon
