import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";

import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();
  
  if (!token || token.error) {
    if (
        window.location.href !== "http://localhost:3000/" &&
        window.location.href !== "http://localhost:3000/sign-up"
    ) 
    {
      alert("You are not logged in !");
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/sign-up" component={Signup} />

          <Route path="/">
            <Signin setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to="/dashboard" /> : <Signin />}
          </Route>
          <Route path="/sign-up" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;