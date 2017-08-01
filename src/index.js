import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import './styles/index.css'
import './styles/normalize.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import registerServiceWorker from './utils/registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

ReactDOM.render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
)
registerServiceWorker()
