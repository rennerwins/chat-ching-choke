import React, { Component } from 'react'
import styled from 'styled-components'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageCreate from './MessageCreate'
import MessageList from './MessageList'
import MessageDetails from './MessageDetails'
import Dropdown from '../../Input/Dropdown'
import { firebaseApp } from '../../../utils/firebase'
import * as adminMessageAction from '../../../modules/adminMessage'
import { connect } from 'react-redux'
import _ from 'lodash'

const TemplateWrapper = styled.div`height: 100%;`

class MessageContainer extends Component {
	state = {
		messageType: [],
		typeSelected: ''
	}

	componentDidMount() {
		this.props.fetchMessageType()
	}

	componentWillReceiveProps(nextProps) {
		const { messageType } = this.props.adminMessage
		let keyTypes = _.keys(messageType)
		this.setState({ messageType: keyTypes })
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	// getMessageType = () => {
	// 	// const { type } = this.state
	// 	// db.ref(`messageTypes/${type}`).on('value', snapshot => {
	// 	// 	let keyTypes = _.keys(snapshot.val())
	// 	// 	keyTypes.map(key => this.getMessageList(key, type))
	// 	// })
	// }

	// getMessageList = (key, type) => {
	// 	const db = firebaseApp.database()
	// 	if (this.state[type] === undefined) this.setState({ [type]: [] })
	// 	db.ref(`messageTemplates/${key}`).on('value', snapshot => {
	// 		console.log(snapshot.val())
	// 		this.setState(prevState => ({
	// 			[type]: [...prevState[type], snapshot.val()]
	// 		}))
	// 	})
	// }

	render() {
		const { adminMessage } = this.props

		return (
			<TemplateWrapper className="row">
				<TemplateLeft>
					<MessageList {...this.state} />
				</TemplateLeft>

				<TemplateRight>
					{adminMessage.text && <MessageDetails {...adminMessage} />}

					{adminMessage.creating && <MessageCreate />}
				</TemplateRight>
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
