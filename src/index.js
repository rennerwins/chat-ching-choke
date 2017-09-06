import React from 'react'
import ReactDOM from 'react-dom'
// import registerServiceWorker from './utils/registerServiceWorker'
import { Provider } from 'react-redux'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import store from './modules/store'

// ================================
// styles dependencies
// ================================
import './styles/index.css'
import './styles/normalize.min.css'
import createMuiTheme from 'material-ui/styles/theme'
import { MuiThemeProvider } from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'animate.css'

const theme = createMuiTheme()
injectTapEventPlugin()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

// registerServiceWorker()
