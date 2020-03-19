import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BusinessCreateComponents from './BusinessCreateComponents';
import BusinessViewComponents from './BusinessViewComponents';
import BusinessUpdateComponents from './BusinessUpdateComponents';
export default function BusinessComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/business"/>
            <Route path="/business/create" component={BusinessCreateComponents} />
            <Route path="/business/:id" component={ BusinessUpdateComponents } />
            <Route path="/business/" component={BusinessViewComponents} />
        </Switch>
    )
}