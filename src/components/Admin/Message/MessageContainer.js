import React, { Component } from 'react'
import styled from 'styled-components'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageCreate from './MessageCreate'
import MessageList from './MessageList'
import { firebaseApp } from '../../../utils/firebase'
import _ from 'lodash'

const TemplateWrapper = styled.div`height: 100%;`

class MessageContainer extends Component {
	state = {
		type: 'welcome'
	}

	componentDidMount() {
		this.getMessageType()
	}

	getMessageType = () => {
		const { type } = this.state
		const db = firebaseApp.database()
		db.ref(`messageTypes/${type}`).on('value', snapshot => {
			let keyTypes = _.keys(snapshot.val())
			keyTypes.map(key => this.getMessageList(key, type))
		})
	}

	getMessageList = (key, type) => {
		const db = firebaseApp.database()
		if (this.state[type] === undefined) this.setState({ [type]: [] })
		db.ref(`messageTemplates/${key}`).on('value', snapshot => {
			this.setState(prevState => ({
				[type]: [...prevState[type], snapshot.val()]
			}))
		})
	}

	render() {
		return (
			<TemplateWrapper className="row">
				<TemplateLeft>
					<MessageList {...this.state} />
				</TemplateLeft>

				<TemplateRight>
					<MessageCreate />
				</TemplateRight>
			</TemplateWrapper>
		)
	}
}

export default MessageContainer
