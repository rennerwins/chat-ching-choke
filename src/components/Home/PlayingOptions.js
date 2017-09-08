import React from 'react'
import Button from 'material-ui/Button'
import LinkButton from '../Common/LinkButton'
import PropTypes from 'prop-types'

const PlayingOptions = ({ accept, deny }) => {
	return (
		<div>
			<h5 className="mb-3">คุณต้องการเข้าร่วมหรือไม่?</h5>

			<LinkButton
				to="/quiz"
				raised
				color="primary"
				onClick={accept}
				text="เข้าร่วม"
			/>

			<Button raised color="default" className="ml-4" onClick={deny}>
				ไม่เข้าร่วม
			</Button>
		</div>
	)
}

PlayingOptions.propTypes = {
	accept: PropTypes.func.isRequired,
	deny: PropTypes.func.isRequired
}

export default PlayingOptions
