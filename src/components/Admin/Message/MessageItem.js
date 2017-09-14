import React from 'react'
import CardWrapper from '../../Common/CardWrapper'

const MessageItem = ({ item, click }) => {
	console.log(item)
	return (
		<CardWrapper>
			<div onClick={click}>
				<h5>{item.text}</h5>
				<small>{item.messageType}</small>
			</div>
		</CardWrapper>
	)
}

export default MessageItem
