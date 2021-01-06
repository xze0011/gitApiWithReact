import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const ProviderApp =(
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
    ProviderApp,
  document.getElementById('root')
);
