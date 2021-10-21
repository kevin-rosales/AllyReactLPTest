import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";

class AuthTestPage extends Component {
  componentDidMount = () => {
    window.lpTag.identities = [];

    window.lpTag.identities.push(identityFn); //Actual pushing of the Identities function into the identities array within the LpTag

    function identityFn(callback) {
      callback({
        iss: "http://localhost:3000",
        /* Issuer, who identified the consumer - usually the brand */
        acr: "loa1",
        /* Authentication Context Class Reference */
        sub: "test23kfnnfnf" /* unique and non-guessable identifier of the consumer as set by the brand on their website */,
      });
    }

    window.lpGetAuthenticationToken = async (callback) => {
      console.log("LP asked for id_token or auth code in Code Flow");
      const token = await axios.post("/getToken").catch((err) => {
        console.log(err.message);
      });
      console.log(token.data.token);
      callback(token.data.token);
    };
  };

  render() {
    return (
      <div className="App-header">
        <h1>Auth Test Area</h1>
        <Link to={"/unauth"}>
          <button>Go Back to unauth</button>
        </Link>
        <div id="authExample"></div>
      </div>
    );
  }
}

export default AuthTestPage;
