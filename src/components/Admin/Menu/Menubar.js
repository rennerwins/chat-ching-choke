import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'

const DrawerWrapper = styled.div``

const Menubar = () => {
	return (
		<DrawerWrapper>
			<div className="row">
				<MenuItem to="/admin/create" text="สร้างชุดคำถาม" />
				<MenuItem to="/admin/msgtemplate" text="สร้าง Template" />
			</div>
		</DrawerWrapper>
	)
}

export default Menubar
