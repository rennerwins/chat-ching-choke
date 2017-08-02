import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker'

// ================================
// components
// ================================
import App from './containers/App'
import Quiz from './containers/Quiz'

// ================================
// styles dependencies
// ================================
import 'animate.css'
import './styles/index.css'
import './styles/normalize.min.css'
import createMuiTheme from 'material-ui/styles/theme'
import { MuiThemeProvider } from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

const theme = createMuiTheme()
injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/quiz" component={Quiz} />
			</Switch>
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById('root')
)

registerServiceWorker()
