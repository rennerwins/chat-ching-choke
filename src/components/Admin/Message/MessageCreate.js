import React, { Component } from 'react'
import CardWrapper from '../../Common/CardWrapper'
import TextArea from '../../Input/TextArea'
import Dropdown from '../../Input/Dropdown'
import { firebaseApp } from '../../../utils/firebase'

class MessageCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: '',
      type: 'WELCOME'
		}
	}

	handleTextMessage = e => {
		let { value } = e.target
		this.setState({ text: value })
  }
  
  handleSubmit = () => {
    firebaseApp.database().ref(`messageTemplates/${this.state.type}`).push(this.state.text)
  }
 
	render() {
		const { text, type } = this.state

		return (
			<div>
				<CardWrapper>
					<TextArea
						change={this.handleTextMessage}
						value={text}
						label="กรอกข้อความ"
						fullWidth
						multiline
					/>

          <button onClick={this.handleSubmit} className="btn btm-primary">Submit</button>

					{/* <Dropdown lable="ประเภทของข้อความ" /> */}
				</CardWrapper>
			</div>
		)
	}
}

export default MessageCreate
