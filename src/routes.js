import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import history from "./history";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: props.location } }}
        />
      )
    }
  />
);


const Routes = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={() => <Feed />} />
      <AuthRoute path="/login" component={() => <Login />} />
      <AuthRoute path="/signup" component={() => <Register />} />
      <Route
        path="*"
        component={() => (
          <Container>
            <h1 style={{ textAlign: "center" }}>Page not found</h1>
          </Container>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;
