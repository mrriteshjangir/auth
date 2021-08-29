import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Dashbaord from "./views/Dashbaord";

import useToken from "./components/useToken";

function App() {
  
  const { token, setToken } = useToken();

  if(!token) {
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
  }
  else
  {
    return (
    <Router>
      <Switch>
        <Route exact path="/">
        {token? <Redirect to="/dashbaord"/> : <Signin />}
        </Route>
        <Route path="/sign-up" component={Signup} />
        <Route path="/dashbaord" component={Dashbaord} />
      </Switch>
    </Router>
    );
  }
}

export default App;
