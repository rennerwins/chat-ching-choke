import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import * as api from '../../utils/api'
import LiveURLDialog from '../../components/LiveURLDialog'

class AdminMain extends Component {
	state = {
		open: false
	}

	resetAll = () => {
		api.restart()
	}

	openDialog = () => {
		this.setState({ open: true })
	}

	handleRequestClose = () => {
		this.setState({ open: false })
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
					<Button raised color="primary" onClick={this.openDialog}>
						ใส่ URL LIVE
					</Button>

					<LiveURLDialog
						open={this.state.open}
						close={this.handleRequestClose}
					/>
				</div>

				<div className="col-12 text-center mb-4">
					<Button onClick={this.resetAll} raised color="accent">
						Reset
					</Button>
				</div>
			</div>
		)
	}
}

export default AdminMain
