import React, { Component } from 'react'
import Button from 'material-ui/Button'
import * as api from '../utils/api'

class Answer extends Component {
	submitAnswer = () => {
		let { PSID, ans } = this.props
		api.answerFromWeb(PSID, ans).then(res => {
			console.log('answered', res)
		})
		this.props.onSelect(this.props.number)
	}

	render() {
		let { ans, selected, cssName } = this.props
		return (
			<Button disabled={selected} onClick={this.submitAnswer} color="primary" className={cssName}>
				{ans}
			</Button>
		)
	}
}

export default Answer
