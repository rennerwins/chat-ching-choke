import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminMain from './AdminMain'
import AdminQuiz from './AdminQuiz'
import AdminParticipants from './AdminParticipants'
import AdminScores from './AdminScores'
import AdminWinner from './AdminWinner'
import AdminUsers from './AdminUsers'
import AdminPrize from './AdminPrize'

class Admin extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/admin" component={AdminMain} />
					<Route path="/admin/quiz" component={AdminQuiz} />
					<Route path="/admin/participants" component={AdminParticipants} />
					<Route path="/admin/scores" component={AdminScores} />
					<Route path="/admin/winner" component={AdminWinner} />
					<Route path="/admin/users" component={AdminUsers} />
					<Route path="/admin/prize" component={AdminPrize} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Admin
