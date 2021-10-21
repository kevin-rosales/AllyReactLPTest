import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../App.css";
class UnAuthTestPage extends Component {
  
    handleClick() {
        // do something meaningful, Promises, if/else, whatever, and then
        window.location.assign("http://localhost:3001/redirect");
      }
  render() {
    return (
      <div className="App-header">
          <button onClick={this.handleClick.bind(this)}>Redirect page</button>
        <h1>UnAuth Test Area</h1>
        <Link to={"/auth"}>
          <button>Click here to next page </button>
        </Link>
        <div id="LP_DIV_1608051086640"></div>
      </div>
    );
  }
}

export default UnAuthTestPage;
