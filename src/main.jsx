import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { Toaster } from "react-hot-toast";
import Context from "./Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Context>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Context>
    </Provider>
  </React.StrictMode>
);
