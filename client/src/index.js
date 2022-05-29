import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'

import Reducer from './Reducers'

const store = createStore(Reducer, applyMiddleware(promiseMiddleware, thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  
      <Routes />
    </BrowserRouter>    
    
  </Provider>,
  document.getElementById('root')
);

