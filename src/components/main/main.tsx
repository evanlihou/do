import "./main.scss";
import * as React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation, Footer } from "../../components";

interface IMainContainerProps {
  component: any;
  path?: string;
  exact?: boolean;
}

export const Main: React.StatelessComponent<IMainContainerProps> = (props) => {
  const { component: Component, ...rest } = props;
  return <Route {...rest} render={matchProps =>
    <div className="wrapper">
      <Navigation showDashboard={matchProps.location.pathname !== "/dashboard"} />
      <div className="content">
        <Component {...matchProps} />
      </div>
      <Footer />
    </div>
  } />
}