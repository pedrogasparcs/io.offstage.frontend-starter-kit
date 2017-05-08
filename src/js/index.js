'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './Reducers'

import s from './../sass/index.scss' // eslint-disable-line no-unused-vars

import SampleContainer from './Containers/SampleContainer'

const middleware = [ thunk ] // thunk to enable ajax calls/promises within actions
if(process.env.NODE_ENV !== "production") middleware.push(createLogger())

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <SampleContainer />
  </Provider>,
  document.getElementById('index')
)
