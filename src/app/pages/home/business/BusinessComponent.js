import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BusinessViewComponents from './component/BusinessViewComponentswComponents';
export default function BusinessComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/business"/>
            <Route path="/business/" component={BusinessViewComponents} />
        </Switch>
    )
}