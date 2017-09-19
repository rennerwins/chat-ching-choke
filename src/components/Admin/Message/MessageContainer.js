import React, { Component } from 'react'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageCreate from './MessageCreate'
import MessageEdit from './MessageEdit'
import MessageList from './MessageList'
import MessageDetails from './MessageDetails'
import Buttons from '../../Input/Buttons'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import * as adminMessageAction from '../../../modules/adminMessage'
import { connect } from 'react-redux'
import * as api from '../../../utils/api'
import _ from 'lodash'

class MessageContainer extends Component {
	state = {
		messageType: [],
		typeSelected: '',
		allMessage: [],
		testing: true
	}

	componentDidMount() {
		this.props.fetchMessageType()
		this.props.fetchAllMessage()
	}

	componentWillReceiveProps(nextProps) {
		const { messageType, allMessage } = nextProps.adminMessage
		let keyTypes = _.keys(messageType)
		let mapKeys = _.keys(allMessage)
		let messageList = _.values(allMessage)
		mapKeys.map(key => allMessage[key].key = key)
		this.setState({ messageType: keyTypes, allMessage: messageList })
	}

	broadcastMessageToUsers = () => {
		const { text } = this.props.adminMessage.selected
		const { testing } = this.state
		let broadcastMessage = {
			message: {
				text
			}
		}

		testing
			? api.broadcastMessageToTestUsers(broadcastMessage)
			: api.broadcastMessage(broadcastMessage)
	}

	handleSwitchChange = () => {
		this.setState(prevState => ({ testing: !prevState.testing }))
	}

	render() {
		const { adminMessage } = this.props
		const { messageType, typeSelected, allMessage } = this.state

		return (
			<div className="row template-wrapper">
				<TemplateLeft>
					<div className="col-12">
						<FormControlLabel
							className="mb-0"
							control={
								<Checkbox
									checked={this.state.testing}
									onChange={this.handleSwitchChange}
									value="Testing"
								/>
							}
							label="Testing"
						/>
					</div>
					{this.state.testing && (
						<div className="col-12">
							<small className="text-muted">*** ยิงหาเฉพาะ Tester</small>
						</div>
					)}

					<MessageList
						messageType={messageType}
						typeSelected={typeSelected}
						allMessage={allMessage}
					/>
				</TemplateLeft>

				<TemplateRight>
					{adminMessage.selected.key &&
					!adminMessage.editing && (
						<MessageDetails
							details={adminMessage.selected}
							broadcast={this.broadcastMessageToUsers}
							edit={() => this.props.editMessage(true)}
						/>
					)}

					{adminMessage.creating && <MessageCreate />}
					{adminMessage.editing && <MessageEdit />}
				</TemplateRight>

				<div className="fab-button">
					<Buttons
						className="float-right"
						fab
						color="primary"
						click={() => this.props.createNewMessage(true)}
					>
						<i className="fa fa-plus" aria-hidden="true" />
					</Buttons>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ adminMessage }) => {
	return { adminMessage }
}

export default connect(mapStateToProps, { ...adminMessageAction })(
	MessageContainer
)
