import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import * as api from '../../utils/api'
import LiveURLDialog from '../../components/LiveURLDialog'
import {
	getTotalUser,
	getTotalCoupon,
	getTotalParticipant,
	getLatestUsers
} from '../../modules/admin'
import { connect } from 'react-redux'
import AdminStats from '../../components/Admin/AdminStats'

class AdminMain extends Component {
	state = {
		open: false,
		maxUserNum: 5
	}

	componentDidMount() {
		this.props.getTotalUser()
		this.props.getTotalCoupon()
		this.props.getTotalParticipant()
		this.props.getLatestUsers(this.state.maxUserNum)
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
			<div className="row pt-3">
				<div className="col-12 mb-3">
					<Paper elevation={4}>
						<div className="row">
							<AdminStats
								header={`จำนวนสมาชิก`}
								number={this.props.totalUsers}
							/>

							<AdminStats
								header={`จำนวนผู้เล่น`}
								number={this.props.totalParticipants}
							/>

							<AdminStats
								header={`จำนวนคูปอง`}
								number={this.props.totalCoupons}
							/>
						</div>
					</Paper>
				</div>

				<div className="col-12 mb-3">
					<div className="row">
						<div className="col text-center mb-2">
							<Link to="/admin/quiz">
								<Button raised color="primary">
									เริ่มกิจกรรม
								</Button>
							</Link>
						</div>

						<div className="col text-center mb-2">
							<Link to="/admin/participants">
								<Button raised color="primary">
									ดูผู้เข้าร่วม
								</Button>
							</Link>
						</div>

						<div className="col text-center mb-2">
							<Link to="/admin/users">
								<Button raised color="primary">
									ดูสมาชิกทั้งหมด
								</Button>
							</Link>
						</div>

						<div className="col text-center mb-2">
							<Button raised color="primary" onClick={this.openDialog}>
								ใส่ URL LIVE
							</Button>

							<LiveURLDialog
								open={this.state.open}
								close={this.handleRequestClose}
							/>
						</div>

						<div className="col text-center mb-2">
							<Link to="/admin/prize">
								<Button raised color="primary">
									แสดงคูปอง
								</Button>
							</Link>
						</div>

						<div className="col text-center mb-2">
							<Link to="/admin/coupon">
								<Button raised color="primary">
									จับรางวัล
								</Button>
							</Link>
						</div>

						<div className="col text-center mb-2">
							<Button onClick={this.resetAll} raised color="accent">
								Reset
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ admin }) => {
	return admin
}

export default connect(mapStateToProps, {
	getTotalUser,
	getTotalCoupon,
	getTotalParticipant,
	getLatestUsers
})(AdminMain)
