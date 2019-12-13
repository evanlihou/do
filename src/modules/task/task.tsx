import "./task.scss";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActionCreators from "../../redux/modules/tasks/tasks";
import { Task as TaskModel } from "../../models/task"
import * as DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'


interface ITaskState {
  taskId: Number;
}

interface ITaskProps {
  match: any;
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
    }
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
      console.error("Bad date value")
    }
    this.props.updateTask(this.props.task);
  }

  handleCheckboxChange(task: TaskModel) {
    task.complete = !task.complete;
    this.props.updateTask(task);
  }

  render() {
    return (
      <div className="container dashboard">
        {this.props.isFetching || this.props.task === undefined ? <p>Fetching...</p> : 
          <div>
            
            <h2>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={this.props.task.complete}
                  onChange={(e) => this.handleCheckboxChange(this.props.task)}></input>
                <span className="custom-checkbox"><FontAwesomeIcon icon={faCheck} /></span>
              </label>
              {this.props.task.what}
            </h2>

            <label>Due:</label>
            <DateTime value={this.props.task.momentWhen} onChange={e => this.handleWhenChange(e)} />
          </div>}
          
      </div>
    )
  }
  }

export const Task = connect(
  (state: any) => {
    return ({isFetching: state.isFetching, task: state.task, error: state.error});
  },
  (dispatch) => bindActionCreators(taskActionCreators, dispatch)
)(TaskComponent)
  