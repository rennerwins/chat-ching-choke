import React, { Component } from 'react'
import InputText from '../../Input/InputText'
import Dropdown from '../../Input/Dropdown'
import CheckBox from '../../Input/CheckBox'
import Buttons from '../../Input/Buttons'
import Card, { CardContent } from 'material-ui/Card'
import { firebaseApp } from '../../../utils/firebase'

class QuizEdit extends Component {
	constructor(props) {
		super(props)

		const { num, quiz } = this.props

		this.state = {
			q: quiz.q,
			selection: ['CHOICES', 'VOTE', 'STRING'],
			type: quiz.type,
			num: num,
			choices: quiz.choices,
			a: quiz.a,
			checked: [false, false, false, false]
		}
	}

	componentDidMount() {
		this.checkAnswerSelection(this.state.a, this.state.choices)
	}

	checkAnswerSelection = (a, choices) => {
		const { checked } = this.state
		if (Array.isArray(a) && Array.isArray(choices)) {
			a.map(answer => {
				choices.map((c, index) => {
					if (answer === c) {
						checked[index] = true
						this.setState({ checked })
          }
          return c
        })
        return answer
			})
		}
	}

	handleChoices = (e, index) => {
		let value = e.target.value
		let { type, choices, a } = this.state

		if (type !== 'STRING') {
			choices[index] = value
			this.setState({ choices })
		} else {
			a[index] = value
			this.setState({ a })
		}
	}

	handleAnswers = (e, index) => {
		let { checked } = this.state
		const { choices } = this.state
		let a = []

		checked[index] = e.target.checked
		checked.map((c, index) => c && a.push(choices[index]))
		this.setState({ a })
	}

	submitQuiz = () => {
		let { q, type, num, choices, a } = this.state
		let quiz = {
			q,
			choices: choices || [],
			a: a || [],
			type
		}

		firebaseApp
			.database()
			.ref(`quiz/${num}`)
      .set(quiz)
    
    this.cancelSubmitQuiz()
	}

	cancelSubmitQuiz = () => {
		this.setState({
			q: '',
			type: '',
			choices: [],
			a: [],
			checked: [false, false, false, false]
		})
	}

	render() {
		let choices = []
		let answers = []
		let stringAnswers = []
		const { type, selection, q } = this.state

		if (type !== 'STRING') {
			for (let i = 0; i < 4; i++) {
				choices.push(
					<InputText
						key={i}
						label={`คำตอบที่ ${i + 1}`}
						fullWidth
						value={this.state.choices[i] || ''}
						change={e => this.handleChoices(e, i)}
					/>
				)
			}

			for (let x = 0; x < this.state.choices.length; x++) {
				answers.push(
					<CheckBox
						key={x}
						checked={this.state.checked[x]}
						label={`ข้อที่ ${x + 1}`}
						value={this.state.choices[x]}
						change={e => this.handleAnswers(e, x)}
					/>
				)
			}
		}

		if (type !== 'VOTE') {
			for (let y = 0; y < 4; y++) {
				stringAnswers.push(
					<InputText
						key={y}
						label={`คำตอบที่ ${y + 1}`}
						fullWidth
						value={this.state.a[y] || ''}
						change={e => this.handleChoices(e, y)}
					/>
				)
			}
		}

		return (
			<div className="container">
				<Card className="mt-3">
					<CardContent>
						<div className="row">
							<div className="col-12 text-center">
								<h2>แก้ไขคำถาม</h2>
							</div>
						</div>

						<div className="row">
							<div className="col-12 mb-3">
								<InputText
									value={q}
									label="คำถาม"
									change={e => this.setState({ q: e.target.value })}
									fullWidth
								/>
							</div>

							<div className="col-12 mb-3">
								<Dropdown
									label="ประเภทคำถาม"
									type={type}
									selection={selection}
									change={e => this.setState({ type: e.target.value })}
								/>
							</div>

							{type === 'CHOICES' && (
								<div>
									<div className="col-12 mb-3">{choices}</div>
									<div className="col-12">{answers}</div>
								</div>
							)}

							{type === 'VOTE' && <div className="col-12 mb-3">{choices}</div>}

							{type === 'STRING' && (
								<div className="col-12 md-3">{stringAnswers}</div>
							)}
						</div>

						<div className="row">
							<div className="col-12">
								<Buttons
									className="float-left"
									text="ยกเลิก"
									click={this.cancelSubmitQuiz}
								/>
								<Buttons
									className="float-right"
									color="primary"
									text="บันทึก"
									click={this.submitQuiz}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default QuizEdit