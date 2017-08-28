import React from 'react'

const PlayingStatus = props => {
	let { canEnter, playing } = props
	return (
		<div>
			{canEnter && playing && <h4>กิจกรรมเริ่มแล้ว</h4>}

			{canEnter && !playing && <h4>กิจกรรมกำลังจะเริ่ม</h4>}

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

export default PlayingStatus
