import React, { Component } from 'react'
import MessageItem from './MessageItem'
import { selectedMessage } from '../../../modules/adminMessage'
import { connect } from 'react-redux'

class MessageList extends Component {
	handleSelection = index => {
		let message = this.props.allMessage[index]
		this.props.selectedMessage(message)
	}

	render() {
		const { allMessage } = this.props

		return (
			<div className="px-3">
				{allMessage.map((item, index) => (
					<div className="col-12" key={index}>
						<MessageItem
							click={() => this.handleSelection(index)}
							item={item}
						/>
					</div>
				))}
				{this.props.children}
			</div>
		)
	}
}

export default connect(null, { selectedMessage })(MessageList)
