import "./task.scss";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActionCreators from "../../redux/modules/tasks/tasks";
import { Task as TaskModel } from "../../models/task";
import * as DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

interface ITaskState {
  taskId: Number;
}

interface ITaskProps {
  match: any;
  history: any;
  isFetching: boolean;
  task: TaskModel;
  taskId: Number;
  getTask: (taskId: Number) => any;
  updateTask: (task: TaskModel, toReturn?: String) => any;
}

class TaskComponent extends React.Component<ITaskProps, ITaskState> {
  constructor(props: any) {
    super(props);
    this.state = {
      taskId: Number(props.match.params.id)
    };
  }

  componentDidMount() {
    this.props.getTask(this.state.taskId);
  }

  componentWillReceiveProps(nextProps) {
    var newId = Number(nextProps.match.params.id);
    if (this.props.task === undefined || this.props.task.taskId !== newId) {
      this.props.getTask(newId);
    }
  }

  handleWhenChange(e: any) {
    console.log(e);
    try {
      console.log(e.toDate());
      this.props.task.when = e.toDate();
    } catch (_ex) {
      // bad value
      console.error("Bad date value");
    }
    this.props.updateTask(this.props.task);
  }

  handleCheckboxChange(task: TaskModel) {
    task.complete = !task.complete;
    this.props.updateTask(task);
  }

  handleWhatChange(value: string, task: TaskModel) {
    task.what = value;
    this.props.updateTask(task);
  }

  render() {
    return (
      <div className="container task">
        {this.props.isFetching || this.props.task === undefined ? (
          <p>Fetching...</p>
        ) : (
          <form>
            <h2>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={this.props.task.complete}
                  onChange={e => this.handleCheckboxChange(this.props.task)}
                ></input>
                <span className="custom-checkbox">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </label>
              <input
                type="text"
                value={this.props.task.what}
                onChange={e =>
                  this.handleWhatChange(e.target.value, this.props.task)
                }
                id="taskWhat"
              ></input>
            </h2>
            <div className="container">
              <label>Due:</label>
              <DateTime
                value={this.props.task.momentWhen}
                onChange={e => this.handleWhenChange(e)}
              />

              {/* This button does nothing because changes are automatically saved, but improves UX */}
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/dashboard");
                }}
              >
                Save
              </button>
              <small>Your changes are also saved automatically.</small>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export const Task = connect(
  (state: any) => {
    return {
      isFetching: state.isFetching,
      task: state.task,
      error: state.error
    };
  },
  dispatch => bindActionCreators(taskActionCreators, dispatch)
)(TaskComponent);
