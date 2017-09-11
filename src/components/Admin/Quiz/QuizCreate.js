import React, { Component } from 'react'
import InputText from '../../Input/InputText'
import Dropdown from '../../Input/Dropdown'
import CheckBox from '../../Input/CheckBox'
import Buttons from '../../Input/Buttons'
import { FormGroup } from 'material-ui/Form'
import Card, { CardContent } from 'material-ui/Card'
import { firebaseApp } from '../../../utils/firebase'

class QuizCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			q: '',
			selection: ['CHOICES', 'VOTE', 'STRING'],
			type: '',
			num: this.props.num,
			choices: [],
			a: [],
			checked: [false, false, false, false]
		}
	}

	componentWillReceiveProps(nextProps) {
		nextProps.num && this.setState({ num: nextProps.num })
	}

	handleChoices = (e, index) => {
		let { value } = e.target
		let { choices } = this.state
		choices[index] = value.trim()
		this.setState({ choices })
	}

	handleAnswers = index => check => {
		let { checked, choices } = this.state
		let answers = []
		checked[index] = check
		checked.map((c, index) => {
			c && answers.push(choices[index])
			this.setState({
				a: answers
			})
		})
	}

	submitQuiz = () => {
		let { q, type, num, choices, a } = this.state
		let quiz = {
			q,
			choices,
			a,
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

		for (let x = 0; x < 4; x++) {
			answers.push(
				<CheckBox
					key={x}
					checked={this.state.checked[x]}
					label={`ข้อที่ ${x + 1}`}
					value={this.state.choices[x] || ''}
					change={this.handleAnswers(x)}
				/>
			)
		}

		return (
			<div className="container">
				<Card className="mt-3">
					<CardContent>
						<div className="row">
							<div className="col-12 text-center">
								<h2>Create New</h2>
							</div>
						</div>

						<div className="row">
							<div className="col-12 mb-3">
								<InputText
									value={this.state.q}
									label="คำถาม"
									change={e => this.setState({ q: e.target.value })}
									fullWidth
								/>
							</div>

							<div className="col-12 mb-3">
								<Dropdown
									label="ประเภทคำถาม"
									type={this.state.type}
									selection={this.state.selection}
									change={e => this.setState({ type: e.target.value })}
								/>
							</div>

							{this.state.type === 'CHOICES' && (
								<div>
									<div className="col-12 mb-3">{choices}</div>
									<div className="col-12">{answers}</div>
								</div>
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

export default QuizCreate
