import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const MessageItem = ({ item, click }) => {
	return (
		<CardWrapper className="pointer">
			<div onClick={click}>
				<small className="text-muted">{item.messageType}</small>
				{item.category === 'text' && <p className="mb-0">{item.text}</p>}
				{item.category === 'image' && (
					<div>
						<img
							src={item.attachment.payload.url}
							alt={item.key}
							width="100px"
						/>
					</div>
				)}
			</div>
		</CardWrapper>
	)
}

export default MessageItem
