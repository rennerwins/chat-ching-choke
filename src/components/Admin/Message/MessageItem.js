import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const MessageItem = ({ item, click }) => {
	return (
		<CardWrapper>
			<div onClick={click}>
				<h5>{item.text}</h5>
				<small className="text-muted">{item.messageType}</small>
			</div>
		</CardWrapper>
	)
}

export default MessageItem
