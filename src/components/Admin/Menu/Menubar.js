import React from 'react'
import MenuItem from './MenuItem'

const Menubar = () => {
	return (
		<div>
			<div className="row">
				<MenuItem to="/admin" text="Dashboard" />
				<MenuItem to="/admin/create" text="สร้างชุดคำถาม" />
				<MenuItem to="/admin/message" text="ส่งข้อความ" />
				<MenuItem to="/admin/defaultmsg" text="ตั้งค่าข้อความ" />
			</div>
		</div>
	)
}

export default Menubar
