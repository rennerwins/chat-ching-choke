import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'

const MessageDetails = ({ details, broadcast, edit }) => {
	const { messageType, text } = details
	return (
		<CardWrapper>
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{messageType}</small>
					<p>{text}</p>
				</div>

				<div className="col-12">
					{/* <Buttons
						color="primary"
						className="float-left"
						text="Edit"
						click={edit}
					/> */}

					<Buttons
						className="float-right"
						text="ส่งข้อความ"
						color="primary"
						raised
						click={broadcast}
					/>
				</div>
			</div>
		</CardWrapper>
	)
}

export default MessageDetails
