import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminMain from './AdminMain'
import AdminQuiz from './AdminQuiz'

class Admin extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/admin" component={AdminMain} />
					<Route path="/admin/quiz" component={AdminQuiz} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Admin
