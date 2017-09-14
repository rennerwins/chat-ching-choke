import React, { Component } from 'react'
import MessageItem from './MessageItem'
import { selectedMessage } from '../../../modules/adminMessage'
import { connect } from 'react-redux'

class MessageList extends Component {
	handleSelection = (type, index) => {
		let message = this.props[type][index]
		this.props.selectedMessage(message)
	}

	render() {
		const { type } = this.props

		return (
			<div className="px-3">
				{this.props[type] && (
					<div className="row">
						<div className="col-12">
							<h5 className="mt-3">{type}</h5>
							<hr className="my-0" />
						</div>

						{this.props[type].map((item, index) => (
							<div className="col-12" key={item.text}>
								<MessageItem
									click={() => this.handleSelection(type, index)}
									item={item}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ adminMessage }) => {
	return { adminMessage }
}

export default connect(mapStateToProps, { selectedMessage })(MessageList)
