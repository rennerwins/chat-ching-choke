import React, { Component } from 'react'
import InputText from '../../Input/InputText'
import Dropdown from '../../Input/Dropdown'
import Card, { CardContent } from 'material-ui/Card'

class QuizCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			q: '',
			selection: ['CHOICES', 'VOTE', 'STRING'],
			type: '',
			num: this.props.num,
			choices: [],
			a: []
		}
	}

	componentWillReceiveProps(nextProps) {
		nextProps.num && this.setState({ num: nextProps.num + 1 })
	}

	handleChoices = (e, index) => {
		let { value } = e.target
		let { choices } = this.state
		choices[index] = value.trim()
		this.setState({ choices })
	}

	render() {
		let choices = []
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
							<div className="col-12">
								<InputText
									value={this.state.q}
									label="คำถาม"
									change={e => this.setState({ q: e.target.value })}
									fullWidth
								/>
							</div>

							<div className="col-12">
								<Dropdown
									label="ประเภทคำถาม"
									type={this.state.type}
									selection={this.state.selection}
									change={e => this.setState({ type: e.target.value })}
								/>
							</div>

							{this.state.type === 'CHOICES' && (
								<div className="col-12">{choices}</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default QuizCreate
