import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const MessageItem = ({ item, click }) => {
	return (
		<CardWrapper className="pointer">
			<div onClick={click}>
				<small className="text-muted">{item.messageType}</small>
				<p className="mb-0">{item.text}</p>
			</div>
		</CardWrapper>
	)
}

export default MessageItem
