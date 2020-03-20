import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ManagerViewComponent from './components/ManagerViewComponent';
export default function BusinessComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/manager"/>
            <Route path="/manager/" component={ManagerViewComponent} />
        </Switch>
    )
}