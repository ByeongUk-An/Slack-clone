import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import App from "../../App";
import { connect } from "react-redux";
import Login from "../../routes/Auth/Login/Login";
import Signup from "../../routes/Auth/Signup/Signup";
import firebase from "../../server/firebase";

import { setUser } from "../../store/action";

const IndexRouter = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.setUser(null);
        props.history.push("/login");
      }
    });
  }, []);

  // console.log("Debug",props.curUser);

  return (
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const mapStateProps = state => {
  return {
    curUser: state.userReducer.curUser
  }
}

const dispatchToProps = dispatch => {
  return {
    setUser: (user) => {dispatch(setUser(user))}
  }
}

const IndexWithRouter = withRouter(connect(mapStateProps, dispatchToProps)(IndexRouter));

export default () => (
  <Router>
    <IndexWithRouter />
  </Router>
);
