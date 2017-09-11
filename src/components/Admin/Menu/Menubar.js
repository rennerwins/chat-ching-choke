import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const DrawerWrapper = styled.div``

const Menubar = () => {
	return (
		<DrawerWrapper>
			<div className="row">
				<div className="col-12 py-3">
					<Link to="/admin/create">
						<h4>สร้างชุดคำถาม</h4>
					</Link>
				</div>
			</div>
		</DrawerWrapper>
	)
}

export default Menubar
