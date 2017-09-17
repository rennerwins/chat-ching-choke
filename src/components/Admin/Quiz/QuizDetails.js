import React from 'react'
import CardWrapper from '../../Common/CardWrapper'
import Buttons from '../../Input/Buttons'

const QuizDetails = ({ details }) => {
	const { q, a, choices, type, num } = details
	return (
		<CardWrapper>
			<div className="row">
				<div className="col-12">
					<small className="text-muted">{type}</small>
					<p><span>{num + 1}.</span> {q}</p>
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
			</div>
		</CardWrapper>
	)
}

export default QuizDetails
