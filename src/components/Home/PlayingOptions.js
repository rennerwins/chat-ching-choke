import React from 'react'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PlayingOptions = ({ accept, deny }) => {
	return (
		<div>
			<h5 className="mb-3">คุณต้องการเข้าร่วมหรือไม่?</h5>

			<Link to="/quiz">
				<Button raised color="primary" className="mr-4" onClick={accept}>
					เข้าร่วม
				</Button>
			</Link>

			<Button raised color="default" onClick={deny}>
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
