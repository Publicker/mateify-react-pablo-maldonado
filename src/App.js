import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CustomAppBar } from "./components/CustomAppBar";
import { Login, PlaylistCreator } from "./routes";

function App() {
  return (
    <Router>
      <div>
        <CustomAppBar />
        <Switch>
          <Route path="/playlist-creator">
            <PlaylistCreator />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
