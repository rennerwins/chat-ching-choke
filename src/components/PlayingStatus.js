import React from 'react'

const PlayingStatus = props => {
	let { canEnter, playing } = props
	return (
		<h4>
			{canEnter && playing && 'กิจกรรมเริ่มแล้ว'}

			{canEnter && !playing && 'กิจกรรมกำลังจะเริ่ม'}

			{!canEnter && !playing && 'กิจกรรมยังไม่เริ่ม ไว้เจอกันวันจันทร์ 2 ทุ่ม นะ'}
		</h4>
	)
}

export default PlayingStatus
