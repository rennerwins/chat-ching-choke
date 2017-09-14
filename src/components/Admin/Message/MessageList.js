import React, { Component } from 'react'
import MessageItem from './MessageItem'
import { selectedMessage } from '../../../modules/adminMessage'
import { connect } from 'react-redux'

class MessageList extends Component {
	handleSelection = (type, index) => {
    console.log(this.props[type][index])
    let message = this.props[type][index]
		this.props.selectedMessage(message)
	}

	render() {
		const { type } = this.props

		return (
			<div className="px-3">
				{this.props[type] &&
					this.props[type].map((item, index) => (
						<MessageItem
							click={() => this.handleSelection(type, index)}
							key={item.text}
							item={item}
						/>
					))}
			</div>
		)
	}
}

const mapStateToProps = ({ adminMessage }) => {
  return { adminMessage }
}

export default connect(mapStateToProps, { selectedMessage })(MessageList)
