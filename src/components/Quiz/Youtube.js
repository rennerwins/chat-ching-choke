import React from 'react'

const Youtube = props => {
	return (
		<div className="embed-responsive embed-responsive-16by9 youtube">
			<iframe
				title="youtube"
				className="embed-responsive-item"
				src={`https://www.youtube.com/embed/${props.liveURL}`}
			/>
		</div>
	)
}

export default Youtube
