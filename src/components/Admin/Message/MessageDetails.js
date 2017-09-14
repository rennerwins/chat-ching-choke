import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'
import { CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'

const MessageDetails = ({ text, messageType }) => {
	return (
		<CardWrapper>
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{messageType}</small>
					<h4>{text}</h4>
				</div>

				<div className="col-12">
					<CardActions>
						<Button dense color="primary">
							แก้ไข
						</Button>
					</CardActions>
				</div>
			</div>
		</CardWrapper>
	)
}

export default MessageDetails
