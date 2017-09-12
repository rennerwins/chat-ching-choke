import React from 'react'
import PropTypes from 'prop-types'

const PlayingStatus = ({ canEnter, playing }) => {
	return (
		<div>
			{canEnter && playing && <h4>กิจกรรมเริ่มแล้ว</h4>}

			{canEnter && !playing && <h4>กิจกรรมกำลังจะเริ่ม</h4>}

			{!canEnter && playing && <h4>คุณไม่มีสิทธิ์เข้าร่วมในตอนนี้</h4>}

			{!canEnter &&
				!playing &&
				<div>
					<h5>
						ขณะนี้หมดช่วงเวลาเล่นเกมแล้ว รอติดตามการจับฉลากหาผู้โชคดีว่าใครจะได้
						Galaxy Note 8 ไปครองในวันศุกร์นี้เวลา 20.00 น.
					</h5>
				</div>}
		</div>
	)
}

PlayingStatus.propTypes = {
	canEnter: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired
}

export default PlayingStatus
