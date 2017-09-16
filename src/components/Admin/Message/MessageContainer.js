import React, { Component } from 'react'
import styled from 'styled-components'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageCreate from './MessageCreate'
import MessageEdit from './MessageEdit'
import MessageList from './MessageList'
import MessageDetails from './MessageDetails'
import Buttons from '../../Input/Buttons'
import * as adminMessageAction from '../../../modules/adminMessage'
import { connect } from 'react-redux'
import * as api from '../../../utils/api'
import _ from 'lodash'

const TemplateWrapper = styled.div`height: 100%;`

class MessageContainer extends Component {
	state = {
		messageType: [],
		typeSelected: '',
		allMessage: []
	}

	componentDidMount() {
		this.props.fetchMessageType()
		this.props.fetchAllMessage()
	}

	componentWillReceiveProps(nextProps) {
		const { messageType, allMessage } = this.props.adminMessage
		let keyTypes = _.keys(messageType)
		let messageList = _.values(allMessage)
		this.setState({ messageType: keyTypes, allMessage: messageList })
	}

	broadcastMessageToUsers = () => {
		const { text } = this.props.adminMessage.selected
		let broadcastMessage = {
			message: {
				text
			}
		}

		api.broadcastMessageToTestUsers(broadcastMessage)
	}

	render() {
		const { adminMessage } = this.props
		const { messageType, typeSelected, allMessage } = this.state

		return (
			<TemplateWrapper className="row">
				<TemplateLeft>
					<MessageList
						messageType={messageType}
						typeSelected={typeSelected}
						allMessage={allMessage}
					/>
				</TemplateLeft>

				<TemplateRight>
					{adminMessage.selected.text && !adminMessage.editing && (
						<MessageDetails
							details={adminMessage.selected}
							broadcast={this.broadcastMessageToUsers}
							edit={() => this.props.editMessage(true)}
						/>
					)}

					{adminMessage.creating && <MessageCreate />}
					{adminMessage.editing && <MessageEdit />}
				</TemplateRight>

				<div className="fixed-bottom mb-4 mr-4">
					<Buttons
						className="float-right"
						fab
						color="primary"
						text="+"
						click={() => this.props.createNewMessage(true)}
					/>
				</div>
			</TemplateWrapper>
		)
	}
}

const mapStateToProps = ({ adminMessage }) => {
	return { adminMessage }
}

export default connect(mapStateToProps, { ...adminMessageAction })(
	MessageContainer
)
