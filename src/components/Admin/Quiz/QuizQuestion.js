import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import styled from 'styled-components'

const ChoiceList = styled.li`line-height: 1.75em;`

const QuizQuestion = props => {
	const { question, edit } = props

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<Card className="mt-3">
						<CardContent>
							<h3>{question.q}</h3>
							<small>
								ประเภท : <span className="text-muted">{question.type}</span>
							</small>
							<ul>
								{question.choices &&
									question.choices.map(choice => (
										<ChoiceList key={choice}>{choice}</ChoiceList>
									))}
							</ul>
							<br />
							{question.type !== 'VOTE' &&
							Array.isArray(question.a) && (
								<h5>
									คำตอบ :{' '}
									{question.a.map((ans, index) => (
										<span key={ans}>
											{ans}
											{index !== question.a.length - 1 && `,`}{' '}
										</span>
									))}
								</h5>
							)}
						</CardContent>

						<CardActions>
							<Button dense color="primary" onClick={edit}>
								แก้ไข
							</Button>
						</CardActions>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default QuizQuestion
