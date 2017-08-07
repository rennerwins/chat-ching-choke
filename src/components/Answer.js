import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar';
import * as api from '../utils/api'

class Answer extends Component {
	state = {
		message: '',
		open: false,
		vertical: 'bottom',
		horizontal: 'right'
	}

	submitAnswer = () => {
		let { PSID, ans } = this.props
		api.answerFromWeb(PSID, ans).then(res => {
			console.log('answered', res)
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
			}
		})
		
		this.props.onSelect(this.props.number)
	}

	handleRequestClose = () => {
		this.setState({ open: false, message: '' })
	}

	render() {
		let { ans, selected, cssName } = this.props
		let { vertical, horizontal, open } = this.state
		return (
			<div>
				<Button
					disabled={selected}
					onClick={this.submitAnswer}
					color="primary"
					className={cssName}
				>
					{ans}
				</Button>

				<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{ this.state.message }</span>}
        />
			</div>
		)
	}
}

export default Answer
