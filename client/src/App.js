import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signin from "./views/Signin";
import Signup from "./views/Signup";

import useToken from "./components/useToken";

function App() {
  
  const { token, setToken } = useToken();

  if(!token) {
    return <Signin setToken={setToken} />
  }
  else
  {
    return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/sign-up" component={Signup} />
      </Switch>
    </Router>
    );
  }
}

export default App;
