import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import AuthTestPage from "./components/AuthTestPage";
import Homepage from "./components/Homepage";
import RedirectComponent from "./components/RedirectComponent";
import UnAuthTestPage from "./components/UnAuthTestPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/unauth" component={UnAuthTestPage} />
            <Route exact path="/auth" component={AuthTestPage} />
            <Route exact path="/redirect" component={RedirectComponent} />
            <Route path="/" component={Homepage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
