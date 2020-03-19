import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SubscriptionViewComponent from './SubscriptionViewComponent';

export default function SubscriptionComponent() {
    return (
        <Switch>

            <Redirect exact={true} from="/" to="/users"/>
            <Route path="/users" component={SubscriptionViewComponent} />

        </Switch>
    )
}