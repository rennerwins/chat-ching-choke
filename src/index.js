import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App';
import store from './modules/store';
import './styles/index.css';
import './styles/normalize.min.css';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
