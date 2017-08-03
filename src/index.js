import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { firebaseApp } from './utils/firebase'
import * as api from './utils/api'

// ================================
// components
// ================================
import App from './containers/App'
import Quiz from './containers/Quiz'
import Admin from './containers/Admin'

// ================================
// styles dependencies
// ================================
import 'animate.css'
import './styles/index.css'
import './styles/normalize.min.css'
import createMuiTheme from 'material-ui/styles/theme'
import { MuiThemeProvider } from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

// ================================
// redux binding
// ================================
const store = createStore(rootReducer)

const theme = createMuiTheme()
injectTapEventPlugin()

firebaseApp.auth().onAuthStateChanged(user => {
	if (user) {
		const { uid } = user.providerData[0]
		api.addNewUserFromWeb(uid, user.uid).then(({ PSID }) => {
			let psid = PSID
			return psid
		})
	}
})

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/quiz" component={Quiz} />
					<Route path="/admin" component={Admin} />
				</Switch>
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
