import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux'

import store from "./store"

import "@/assets/css/App.less"
import "@/assets/css/variables.css"
import "@/assets/css/base.css"
import "@/assets/font/css/font-awesome.min.css"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
