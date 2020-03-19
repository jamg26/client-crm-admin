import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";


import { LayoutSplashScreen } from "../../../_metronic";

const BusinessComponent = lazy(() =>
  import("./business/BusinessComponent")
);

const SubscriptionComponent = lazy(() =>
  import("./subscriptions/SubscriptionComponent")
);

export default function HomePage() {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={SubscriptionComponent} />
        <Route path="/business" component={BusinessComponent} />
      </Switch>
    </Suspense>
  );
}
