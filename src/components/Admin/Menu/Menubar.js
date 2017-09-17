import React from 'react'
import MenuItem from './MenuItem'

const Menubar = () => {
	return (
		<div>
			<div className="row">
				<MenuItem to="/admin" text="Dashboard" />
				<MenuItem to="/admin/create" text="สร้างชุดคำถาม" />
				<MenuItem to="/admin/message" text="สร้าง Template" />
			</div>
		</div>
	)
}

export default Menubar
