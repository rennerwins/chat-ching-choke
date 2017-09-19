import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'

const MessageDetails = ({ details, broadcast, edit }) => {
	const { messageType, text, category, attachment, key } = details
	return (
		<CardWrapper className="msg-template">
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{messageType}</small>
					{category === 'text' && <p>{text}</p>}
					{category === 'image' && (
						<div className="mb-2">
							<img src={attachment.payload.url} alt={key} width="200px" />
						</div>
					)}
				</div>

				<div className="col-12">
					{/* <Buttons
						color="primary"
						className="float-left"
						text="แก้ไข"
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
