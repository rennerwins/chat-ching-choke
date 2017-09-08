import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminMain from './AdminMain'
import AdminQuiz from './AdminQuiz'
import AdminParticipants from './AdminParticipants'
import AdminScores from './AdminScores'
import AdminWinner from './AdminWinner'
import AdminUsers from './AdminUsers'
import AdminPrize from './AdminPrize'
import AdminCoupon from './AdminCoupon'
import Menubar from '../../components/Admin/Menu/Menubar'
import styled from 'styled-components'

const AdminMenu = styled.div`
	background-color: #fff;
	z-index: 2;
	box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.3);
`
const AdminActions = styled.div`background-color: red;`
const AdminWrapper = styled.div`height: 100%;`

class Admin extends Component {
	render() {
		return (
			<AdminWrapper className="row">
				<AdminMenu className="col-4 col-md-2">
					<Menubar />
				</AdminMenu>

				<AdminActions className="col">
					<Switch>
						<Route exact path="/admin" component={AdminMain} />
						<Route path="/admin/quiz" component={AdminQuiz} />
						<Route path="/admin/participants" component={AdminParticipants} />
						<Route path="/admin/scores" component={AdminScores} />
						<Route path="/admin/winner" component={AdminWinner} />
						<Route path="/admin/users" component={AdminUsers} />
						<Route path="/admin/prize" component={AdminPrize} />
						<Route path="/admin/coupon" component={AdminCoupon} />
					</Switch>
				</AdminActions>
			</AdminWrapper>
		)
	}
}

export default Admin
