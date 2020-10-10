import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/routes/Router";
import { Provider } from "react-redux";
import store from "./store/store";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
