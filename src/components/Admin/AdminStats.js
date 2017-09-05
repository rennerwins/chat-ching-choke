import React from 'react'

const AdminStats = props => {
	return (
		<div className="col-4 mb-3 text-center">
			<p className="mb-0">{props.header}</p>
			<h2>{props.number}</h2>
		</div>
	)
}


export default AdminStats
