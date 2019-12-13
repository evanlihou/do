import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Main, NotFound } from "../../components";
import { Home, Dashboard, Task, Account } from "../../modules";

export class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Main exact path="/" component={Home} />
          <Main path="/dashboard" component={Dashboard} />
          <Main path="/task/:id" component={Task} />
          <Main path="/account" component={Account} />
          <Main path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
