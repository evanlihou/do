import "./dashboard.scss";
import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActionCreators from "../../redux/modules/tasks/tasks";
import { Task as TaskModel } from "../../models/task";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faCheck } from "@fortawesome/free-solid-svg-icons";
import moment = require("moment");

interface IDashboardState {
  tasks: TaskModel[];
}

interface IDashboardProps {
  match: any;
  isFetching: boolean;
  tasks: TaskModel[];
  getAllTasks: () => any;
  updateTask: (TaskModel, String) => any;
}

class DashboardComponent extends React.Component<
  IDashboardProps,
  IDashboardState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.props.getAllTasks();
  }

  handleCheckboxChange(task: TaskModel) {
    task.complete = !task.complete;
    this.props.updateTask(task, "ALL");
  }

  render() {
    let tasksList = undefined;
    if (this.props.tasks != undefined) {
      tasksList = this.props.tasks.map(task => {
        return (
          <li key={task.taskId.toString()}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={task.complete}
                onChange={e => this.handleCheckboxChange(task)}
              ></input>
              <span className="custom-checkbox">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </label>
            <span>{task.what}</span>
            {(task.momentWhen !== undefined && (
              <span
                className={task.momentWhen.isBefore(moment()) ? "due-soon" : ""}
              >
                {task.momentWhen.fromNow()}
              </span>
            )) || <span></span>}
            <Link to={`/task/${task.taskId}`}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </Link>
          </li>
        );
      });
    }

    return (
      <div className="container dashboard">
        <h1>Dashboard</h1>
        {this.props.isFetching ? (
          <p>Fetching...</p>
        ) : (
          <div>
            {tasksList != undefined ? (
              <ul className="tasks-list">{tasksList}</ul>
            ) : (
              <span>No Tasks Found...</span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export const Dashboard = connect(
  (state: any) => {
    return {
      isFetching: state.isFetching,
      tasks: state.tasks,
      error: state.error
    };
  },
  dispatch => bindActionCreators(taskActionCreators, dispatch)
)(DashboardComponent);
