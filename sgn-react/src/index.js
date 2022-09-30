import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import languageReducer from "../src/store/reducer/language";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { AuthProvider } from './context/AuthContext'

// axios.defaults.baseURL = 'https://sleepy-savannah-00668.herokuapp.com/';
axios.defaults.baseURL = 'https://sgn-backend.herokuapp.com/';
// axios.defaults.baseURL = 'http://localhost:4000/';


axios.defaults.headers['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
	language: languageReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware())
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(
    app,
  document.getElementById('root')
);
