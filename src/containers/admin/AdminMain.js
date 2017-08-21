import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import * as api from '../../utils/api'
import TextField from 'material-ui/TextField'

class AdminMain extends Component {
	resetAll = () => {
		api.restart()
	}

	render() {
		return (
			<div className="row pt-4">

				<div className="col-12 text-center mb-4">
					<Link to="/admin/quiz">
						<Button raised color="primary">
							เริ่มกิจกรรม
						</Button>
					</Link>
				</div>

				<div className="col-12 text-center mb-4">
					<Link to="/admin/participants">
						<Button raised color="primary">
							ดูผู้เข้าร่วม
						</Button>
					</Link>
				</div>

				<div className="col-12 text-center mb-4">
					<Button onClick={this.resetAll} raised color="accent">
						Reset
					</Button>
				</div>

				<div className="col-12 text-center">
				<TextField
						className="mt-0 mb-2"
						style={{ width: '100%' }}
						placeholder="ใส่ live url"
						margin="normal"
					/>
					<br />
					<Button
						raised
						color="primary"
					>
						ยืนยัน
					</Button>
				</div>

			</div>
		)
	}
}

export default AdminMain
