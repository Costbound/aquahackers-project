import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "../node_modules/modern-normalize/modern-normalize.css";
import "../node_modules/reset-css/reset.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";
import {ModalProvider} from "./components/Modal/ModalProvider.jsx"; // Добавил для улучшения в поисковых системах, по заголовкам/мета тегам

axios.defaults.baseURL = "https://final-team-pr-backend.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
