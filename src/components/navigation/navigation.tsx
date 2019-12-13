import "./navigation.scss";
import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Task as TaskModel } from "../../models/task"
import * as taskActionCreators from "../../redux/modules/tasks/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface INavigationComponentState {
}

const initialState: INavigationComponentState = {
};

interface INavigationComponentProps {
    showDashboard: boolean;
    createTask: (TaskModel) => any;
    createdTaskId?: Number;
}

class NavigationComponent extends React.Component<INavigationComponentProps, INavigationComponentState> {
    static propTypes = {
        showDashboard: PropTypes.bool
    }
    constructor(props: INavigationComponentProps) {
        super(props);
        this.state = initialState;
    }

    handleQuickAddKeyup(e: any) {
        if (e.key == 'Enter') {
            this.props.createTask({
                what: e.target.value
            } as TaskModel);
            e.target.value = "";
        }
    }

    render() {
        return (
            <nav className="main-nav">
                {(this.props.createdTaskId != null && <Redirect to={`/task/${this.props.createdTaskId}`} />)}
                <div className="wordmark">
                    Do.
                </div>
                <ul className="left-nav">
                    <li><Link to="/">Home</Link></li>
                </ul>
                <div className="quick-add">
                    <input onKeyUp={(e) => this.handleQuickAddKeyup(e)} placeholder="Quick add..."></input>
                </div>
                {this.props.showDashboard == true ? (
                    <ul className="right-nav">
                        <li><Link to="/dashboard">Go To Dashboard</Link></li>
                    </ul>
                ) : ("")
                }
                <div className="account-button">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </nav>
        )
    }
}

export const Navigation = connect(
    (state: any) => {
      return ({isFetching: state.isFetching, tasks: state.tasks, error: state.error, createdTaskId: state.createdTaskId});
    },
    (dispatch) => bindActionCreators(taskActionCreators, dispatch)
  )(NavigationComponent);
    