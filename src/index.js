import React from 'react'
import ReactDOM from 'react-dom'
// import registerServiceWorker from './utils/registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'

// ================================
// styles dependencies
// ================================
import './styles/index.css'
import './styles/normalize.min.css'
import createMuiTheme from 'material-ui/styles/theme'
import { MuiThemeProvider } from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'

// ================================
// redux binding
// ================================
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
)

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
