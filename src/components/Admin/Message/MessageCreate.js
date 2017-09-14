import React, { Component } from 'react'
import CardWrapper from '../../Common/CardWrapper'
import TextArea from '../../Input/TextArea'
import Dropdown from '../../Input/Dropdown'
import Buttons from '../../Input/Buttons'
import InputText from '../../Input/InputText'
import * as api from '../../../utils/api'

class MessageCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messageType: '',
			category: '',
			categoryCollection: ['text', 'image', 'quick_reply'],
			typeCollection: ['welcome'],
			text: '',
			quickReplies: [],
			title: '',
			imgURL: '',
			payload: '',
			choiceNum: 1
		}
	}

	handleTextMessage = e => {
		let { value } = e.target
		this.setState({ payload: value })
	}

	handleSubmit = () => {
		const { messageType, category, payload, quickReplies, text } = this.state
		let body = {}

		if (category === 'image' || category === 'text') {
			body = {
				messageType,
				category,
				payload
			}
		} else if (category === 'quick_reply') {
			body = {
				messageType,
				category,
				quickReplies,
				text
			}
		}

		api.addTemplateMessage(body)
		this.handleClearForm()
	}

	handleClearForm = () => {
		this.setState({
			messageType: '',
			category: '',
			categoryCollection: ['text', 'image', 'quick_reply'],
			typeCollection: ['welcome'],
			text: '',
			quickReplies: [],
			payload: ''
		})
	}

	handleChoiceNum = e => {
		let { value } = e.target
		this.setState({ choiceNum: value })
	}

	render() {
		const {
			message,
			messageType,
			types,
			payload,
			quickReplies,
			choiceNum
		} = this.state

		return (
			<div>
				<CardWrapper>
					<div className="row mb-3">
						<div className="col">
							<Dropdown
								label="ประเภทของข้อความ"
								type={this.state.category}
								selection={this.state.categoryCollection}
								change={e => this.setState({ category: e.target.value })}
							/>
							<span className="mr-3" />
							<Dropdown
								label="หมวดหมู่"
								type={this.state.messageType}
								selection={this.state.typeCollection}
								change={e => this.setState({ messageType: e.target.value })}
							/>
						</div>
					</div>
				</CardWrapper>

				<CardWrapper>
					<div className="row mb-3">
						<div className="col-12">
							{this.state.category === 'image' && (
								<InputText
									change={this.handleTextMessage}
									value={payload}
									label="ใส่ url ภาพ"
									fullWidth
								/>
							)}

							{this.state.category === 'text' && (
								<TextArea
									change={this.handleTextMessage}
									value={payload}
									label="กรอกข้อความ"
									fullWidth
									multiline
									rows="2"
								/>
							)}

							{this.state.category === 'quick_reply' && (
								<div>
									<InputText
										label="จำนวนข้อ"
										change={this.handleChoiceNum}
										value={choiceNum}
										type="number"
										max={11}
										min={1}
										fullWidth
									/>
								</div>
							)}
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<Buttons
								className="float-left"
								click={this.handleClearForm}
								text="Cancel"
							/>

							<Buttons
								className="float-right"
								click={this.handleSubmit}
								text="Submit"
								color="primary"
							/>
						</div>
					</div>
				</CardWrapper>
			</div>
		)
	}
}

export default MessageCreate
