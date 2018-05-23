import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
//import {Provider} from 'react-redux'
//import configureStore from './configureStore'
import './assets/scss/style.scss'

const app = document.getElementById('app')
/*const store = configureStore({
  initialState: JSON.parse(window.__REDUX_STATE__),
})*/
ReactDOM.render(
  //<Provider store={store}>
  <h1>Hello World</h1>,
  //</Provider>,
  app
)
