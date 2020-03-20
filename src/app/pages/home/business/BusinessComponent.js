import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BusinessViewComponent from './components/BusinessViewComponent';
export default function BusinessComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/business"/>
            <Route path="/business/" component={BusinessViewComponent} />
        </Switch>
    )
}