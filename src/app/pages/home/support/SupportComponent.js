import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SupportViewComponent from './components/SupportViewComponent';
export default function SupportComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/supportrequest"/>
            <Route path="/supportrequest/" component={SupportViewComponent} />
        </Switch>
    )
}