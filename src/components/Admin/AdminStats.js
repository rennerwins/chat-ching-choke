import React from 'react'

const AdminStats = props => {
	let { header, number } = props

	return (
		<div className="col-12 col-md-4 my-2 text-center">
			<p className="mb-0">{header}</p>
			<h2 className="animated bounceIn">{number ? number : '----'}</h2>
		</div>
	)
}

export default AdminStats
