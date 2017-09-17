import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'

const QuizDetails = ({ details }) => {
	const { q, a, choices, type } = details
	// const { messageType, text } = details
	return (
		<CardWrapper>
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{type}</small>
					<p>{q}</p>
				</div>

				<div className="col-12">
					<ol>
						{choices && choices.map(choice => <li key={choice}>{choice}</li>)}
					</ol>
				</div>

				<div className="col-12">
					{type !== 'VOTE' &&
					Array.isArray(a) && (
						<small>
							คำตอบ :{' '}
							{a.map((ans, index) => (
								<span key={ans}>
									{ans}
									{index !== a.length - 1 && `,`}{' '}
								</span>
							))}
						</small>
					)}
				</div>

				<div className="col-12">
					<Buttons
						color="primary"
						className="float-left"
						text="แก้ไข"
					/>
				</div>

				{/* <div className="row">
					<div className="col-12">
						<Card className="mt-3">
							<CardContent>
								<h3>{question.q}</h3>
								<small>
									ประเภท : <span className="text-muted">{question.type}</span>
								</small>
								<ol>
									{question.choices &&
										question.choices.map(choice => (
											<ChoiceList key={choice}>{choice}</ChoiceList>
										))}
								</ol>
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
				</div> */}
			</div>
		</CardWrapper>
	)
}

export default QuizDetails
