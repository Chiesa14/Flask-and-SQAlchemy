import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import bookReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
