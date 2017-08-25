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
						ยินดีต้อนรับเข้าสู่เกมแชทชิงโชค จันทร์นี้ 2 ทุ่ม
						เพียงตอบคำถามขั้นต่ำ 3 ข้อ ทาง{' '}
						<a href="https://youtube.com/droidsans">youtube.com/droidsans</a>{' '}
						ก็มีสิทธิ์ร่วมลุ้นรับเครื่อง Galaxy Note 8 ฟรี!
					</h5>

					<p>
						กติกาอ่านเพิ่มเติมได้ที่{' '}
						<a href="https://droidsans.com/chatchingchoke-august-note8/">
							https://droidsans.com/chatchingchoke-august-note8/
						</a>
						อย่าลืมเข้ามาร่วมสนุกกับพวกเรานะ
					</p>
				</div>}
		</div>
	)
}

export default PlayingStatus
