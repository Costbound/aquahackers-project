import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import '../node_modules/modern-normalize/modern-normalize.css'
import '../node_modules/reset-css/reset.css'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store.js";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
