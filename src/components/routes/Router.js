import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import App from "../../App";
import Login from "../../routes/Auth/Login/Login";
import Signup from "../../routes/Auth/Signup/Signup";
import firebase from "../../server/firebase";

const IndexRouter = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.history.push("/");
      } else {
        props.history.push("/login");
      }
    });
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const IndexWithRouter = withRouter(IndexRouter);

export default () => (
  <Router>
    <IndexWithRouter />
  </Router>
);
