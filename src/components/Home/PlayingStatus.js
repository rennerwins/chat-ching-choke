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
						แชทชิงโชค ซีซั่น 2 กันยา-ตุลา นี้ประกาศแล้วว่าจะแจก iPhone รุ่นใหม่ คืนนี้เจอกันเวลาเดิม 20:00 น.
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
