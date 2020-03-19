import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ManagerViewComponent from './ManagerViewComponent';
import ManagerCreateComponent from './ManagerCreateComponent';
export default function BusinessComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/manager"/>
            <Route path="/manager/create" component={ManagerCreateComponent} />
            <Route path="/manager/" component={ManagerViewComponent} />
        </Switch>
    )
}