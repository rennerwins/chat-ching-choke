import React, { Component } from 'react'
import styled from 'styled-components'
import TemplateLeft from '../Template/TemplateLeft'
import TemplateRight from '../Template/TemplateRight'
import MessageItem from './MessageCreate'
import { firebaseApp } from '../../../utils/firebase'

const TemplateWrapper = styled.div`height: 100%;`

class MessageContainer extends Component {
	render() {
		return (
			<TemplateWrapper className="row">
				<TemplateLeft>
					<h1>Left</h1>
				</TemplateLeft>

				<TemplateRight>
					<MessageItem></MessageItem>
				</TemplateRight>
			</TemplateWrapper>
		)
	}
}

export default MessageContainer
