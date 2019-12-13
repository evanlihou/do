import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Main, NotFound } from "../../components";
import { Home, Dashboard, Task } from "../../modules";

export class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Main exact path="/" component={Home} />
                    <Main path="/dashboard" component={Dashboard} />
                    <Main path="/task/:id" component={Task} />
                    <Main path="*" component={NotFound} />
                </Switch>
            </Router>
        )
    }
}