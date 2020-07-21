import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers,applyMiddleware  } from "redux"
import { vacations,modalIsOpen} from "./reducers"
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'


const middleware = applyMiddleware(thunkMiddleware,createLogger())
const rootReducer=combineReducers({vacations,modalIsOpen})

const store = createStore(
 
  rootReducer,
  middleware
 
)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
