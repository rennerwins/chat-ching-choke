import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import * as api from '../utils/api'

class InputAnswer extends Component {
	state = {
		message: '',
		open: false,
		vertical: 'bottom',
		horizontal: 'right',
		answer: '',
		answered: false
	}

	submitAnswer = () => {
		let { PSID } = this.props
		let { answer } = this.state
		api.answerFromWeb(PSID, answer).then(res => {
			if (res.message === 'update success') {
				this.setState({
					open: true,
					message: 'ได้รับคำตอบแล้วจ้า'
				})
			} else if (res.error === 1) {
				this.setState({
					open: true,
					message: 'หมดเวลาตอบข้อนี้แล้ว'
				})
			} else if (res.error === 2) {
				this.setState({
					open: true,
					message: 'คุณตอบข้อนี้ไปแล้ว'
				})
			}
		})
		this.setState({ answered: true })
		this.props.onAnswer()
	}

	handleChange = e => {
		this.setState({
			answer: e.target.value
		})
	}

	handleRequestClose = () => {
		this.setState({ open: false, message: '' })
	}

	render() {
		let { vertical, horizontal, open, answer, answered } = this.state
		return (
			<div className="row">
				<div className="col-12 col-md-6 offset-md-3 text-center">
					<TextField
						id="name"
						className="mt-0 mb-2"
						style={{ width: '100%' }}
						value={answer}
						disabled={answered}
						onChange={this.handleChange}
						placeholder="พิมพ์คำตอบ"
						margin="normal"
					/>
					<br />
					<Button
						raised
						color="primary"
						onClick={this.submitAnswer}
						disabled={answered}
					>
						ยืนยัน
					</Button>
				</div>

				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onRequestClose={this.handleRequestClose}
					SnackbarContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={
						<span id="message-id">
							{this.state.message}
						</span>
					}
				/>
			</div>
		)
	}
}

export default InputAnswer
