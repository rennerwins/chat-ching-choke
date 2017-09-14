import React, { Component } from 'react'
import styled from 'styled-components'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageItem from './MessageCreate'
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
			keyTypes.map(t => this.getMessageList(t))
		})
	}

	getMessageList = type => {
		const db = firebaseApp.database()
		db.ref(`messageTemplates/${type}`).on('value', snapshot => {
			// console.log(snapshot.val())
		})
	}

	render() {
		return (
			<TemplateWrapper className="row">
				<TemplateLeft>
					<h1>Left</h1>
				</TemplateLeft>

				<TemplateRight>
					<MessageItem />
				</TemplateRight>
			</TemplateWrapper>
		)
	}
}

export default MessageContainer
