import React, { Component } from 'react'
import Button from 'material-ui/Button'
import * as api from '../utils/api'

class Answer extends Component {
	submitAnswer = () => {
    
    let { PSID, ans } = this.props
    console.log(PSID, ans)
    api.answerFromWeb(PSID, ans).then(res => {
      console.log('answered', res)
    })
  }

	render() {
		return (
			<Button onClick={this.submitAnswer} color="primary" className="answer-button">
				{this.props.ans}
			</Button>
		)
	}
}

export default Answer
