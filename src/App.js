import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LandingPage } from "./Landing.page";
import { AppLayout } from "./app.layout";
import { ProtectedRoute } from "./protected.route";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/app" component={AppLayout} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
