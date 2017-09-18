import React, { Component } from 'react'
import CardWrapper from '../../Common/CardWrapper'
import TextArea from '../../Input/TextArea'
import Dropdown from '../../Input/Dropdown'
import Buttons from '../../Input/Buttons'
import InputText from '../../Input/InputText'
import * as api from '../../../utils/api'
import { connect } from 'react-redux'
import { createNewMessage } from '../../../modules/adminMessage'
import _ from 'lodash'

class MessageCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messageType: '',
			category: '',
			categoryCollection: ['text', 'image', 'quick_reply'],
			typeCollection: [],
			text: '',
			quickReplies: [],
			title: '',
			imgURL: '',
			payload: '',
			choiceNum: 1
		}
	}

	componentDidMount() {
		const { messageType } = this.props.adminMessage
		let types = _.keys(messageType)
		this.setState({ typeCollection: types })
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
		this.props.createNewMessage(false)
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
			payload,
			choiceNum,
			category,
			categoryCollection,
			messageType,
			typeCollection
		} = this.state

		return (
			<CardWrapper className="msg-template">
				<div className="row mb-3">
					<div className="col-12">
						<Dropdown
							label="หมวดหมู่"
							type={messageType}
							selection={typeCollection}
							change={e => this.setState({ messageType: e.target.value })}
						/>
					</div>
				</div>
				
				<div className="row mb-3">
					<div className="col-12">
						{messageType && (
							<Dropdown
								label="ประเภทของข้อความ"
								type={category}
								selection={categoryCollection}
								change={e => this.setState({ category: e.target.value })}
							/>
						)}
					</div>
				</div>

				<div className="row mb-3">
					<div className="col-12">
						{category === 'image' && (
							<InputText
								change={this.handleTextMessage}
								value={payload}
								label="ใส่ url ภาพ"
								fullWidth
							/>
						)}

						{category === 'text' && (
							<TextArea
								change={this.handleTextMessage}
								value={payload}
								label="กรอกข้อความ"
								fullWidth
								multiline
								rows="2"
							/>
						)}

						{category === 'quick_reply' && (
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
							text="ยกเลิก"
						/>
						{messageType &&
						category && (
							<Buttons
								className="float-right"
								click={this.handleSubmit}
								text="ยืนยัน"
								color="primary"
							/>
						)}
					</div>
				</div>
			</CardWrapper>
		)
	}
}

const mapStateToProps = ({ adminMessage }) => ({ adminMessage })

export default connect(mapStateToProps, { createNewMessage })(MessageCreate)
