import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import TrackingPage from "./modules/Tracking/pages/TrackingPage";
import LandingPage from "./modules/Landing/LandingPage";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/search" component={LandingPage} />
      <Route exact path="/tracking/:trackingNumber" component={TrackingPage} />
      <Redirect to="/search" />
    </Switch>
  );
}
