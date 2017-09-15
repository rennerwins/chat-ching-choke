import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'
import { CardActions } from 'material-ui/Card'

const MessageDetails = ({ details, broadcast }) => {
	const { messageType, text } = details
	return (
		<CardWrapper>
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{messageType}</small>
					<h4>{text}</h4>
				</div>

				<div className="col-12">
					<CardActions>
						<Buttons text="ยิงข้อความ" color="primary" raised click={broadcast} />
					</CardActions>
				</div>
			</div>
		</CardWrapper>
	)
}

export default MessageDetails
