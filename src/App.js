import React, { useState, useEffect } from "react";
import pako from "pako";
import './App.css';
import {firestore} from "./js/Firestore";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";
import WRD from "./WRD/WRD";

//import UpdateDB from "./js/DatabaseHandlers"
//global.UpdateDB = function () {
//  UpdateDB();
//  return "wait for console";
//};
require("dotenv").config();

global.debug = false;
global.throw = function (title, vars, error) {
  if (global.debug) {
    console.error(title);
    console.log(vars);
    console.error(error);
  } else {
    console.error(title);
  }
};
global.log = function (str, data){
  if (global.debug) {
    console.log(str);
    console.log(data);
  }
}

function App() {
  //renders
  const [DB, setDB] = useState(null);

  useEffect(() => {
    firestore
    .collection("zip")
    .doc("WRD")
    .get()
    .then(queryDocumentSnapshot => {
      var inflated = JSON.parse(
        pako.inflate(queryDocumentSnapshot.data().dat, { to: "string" })
      );
      setDB(inflated);
    });
  }, []);

  if (!DB) {
    return (
      <div className="card">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Router basename="/wrddb">
        <div className="container">
          <Switch>
            <Route path="/:Page?/:code*">
              <RedirectWrapper DB={DB}></RedirectWrapper>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function RedirectWrapper({DB}) {
  let params = useParams();
  let history = useHistory();

  let setCode = (x) => {
    history.push("/" + params.Page + "/" + x);
  };

  if(!params.Page){
    params.Page = "DeckBuilder";
    history.push("/" + params.Page);
  }
  
  if (window.location.search && !params.Page) {
    let l = window.location.search.split("/");
    //window.location.search = "";
    params.Page = l.length > 1 ? l[1] : "";
    params.code = l.length > 2 ? l[2] : "";
    for (let i = 3; i < l.length; i++) {
      params.code += "/" + l[i];
    }
    setCode(params.code);
  }
  
  return <WRD Honey={{ params: params, DB:DB }} API={{setCode: setCode }} />
}


export default App;
