import { Task } from "../../../models";
import { AnyAction, Dispatch } from "redux";
import { nSQL } from "@nano-sql/core";
import * as moment from "moment";

// One task actions
const FETCHING_TASK = 'FETCHING_TASK'
const FETCHING_TASK_SUCCESS = 'FETCHING_TASK_SUCCESS'
const FETCHING_TASK_FAILURE = 'FETCHING_TASK_FAILURE'
const UPDATED_TASK = 'UPDATED_TASK'
const CREATED_TASK = 'CREATED_TASK'

// All tasks actions
const FETCHING_ALL_TASKS = 'FETCHING_ALL_TASKS'
const FETCHING_ALL_TASKS_SUCCESS = 'FETCHING_ALL_TASKS_SUCCESS'
const FETCHING_ALL_TASKS_FAILURE = 'FETCHING_ALL_TASKS_FAILURE'

export const getTask = (taskId: Number) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchingTask());
    nSQL("todos").query("select").where(["taskId", "=", taskId]).exec().then((rows: Task[]) => {
      if (rows.length != 1) {
        dispatch(fetchingTaskFailure("Could not find task."))
      }
      if (rows[0].when !== undefined)
        rows[0].momentWhen = moment(rows[0].when)
      dispatch(fetchingTaskSuccess(rows[0]));
    }).catch(e => {
      dispatch(fetchingTaskFailure(e));
    })
    }
  }

const fetchingTask = () => {
  return {
    type: FETCHING_TASK
  }
}

const fetchingTaskSuccess = (task: Task) => {
  return {
    type: FETCHING_TASK_SUCCESS,
    task
  }
}

const fetchingTaskFailure = (error: string) => {
  alert(error);
  return {
    type: FETCHING_TASK_FAILURE
  }
}

export const getAllTasks = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchingTask());
    nSQL("todos").query("select").exec().then((rows: Task[]) => {
      rows.forEach((row) => {
        if (row.when !== undefined)
          row.momentWhen = moment(row.when);
      })
      dispatch(fetchingAllTasksSuccess(rows));
    }).catch((e) => {
      dispatch(fetchingAllTasksFailure(e));
    })
  }
}

const fetchingAllTasksSuccess = (tasks: Task[]) => {
  return {
    type: FETCHING_ALL_TASKS_SUCCESS,
    tasks
  }
}

const fetchingAllTasksFailure = (error: string) => {
  alert(error);
  return {
    type: FETCHING_ALL_TASKS_FAILURE
  }
}

const updatedTask = (task: Task) => {
  return {
    type: UPDATED_TASK,
    task: task,
    taskId: task.taskId
  }
}

// Update task based on taskId in the model passed in.
export const updateTask = (task: Task, toReturn: String) => {
  return (dispatch: Dispatch) => {
      nSQL("todos").query("upsert",
        [
          task
        ])
      .exec().then((updatedRows: Task[]) => {
        console.log("Updated", updatedRows[0]);
        if (toReturn != "ALL") {
          if (updatedRows[0].when !== undefined)
            updatedRows[0].momentWhen = moment(updatedRows[0].when);
          dispatch(updatedTask(updatedRows[0]))
        }
        if (toReturn == "ALL") {
          nSQL("todos").query("select").exec().then((rows: Task[]) => {
            rows.forEach((row) => {
              if (row.when !== undefined)
                row.momentWhen = moment(row.when);
            })
            dispatch(fetchingAllTasksSuccess(rows));
          }).catch((e) => {
            dispatch(fetchingAllTasksFailure(e));
          })
        }
      })
  }
}

const createdTask = (taskId: Number) => {
  return {
    type: CREATED_TASK,
    taskId: taskId
  }
}
export const createTask = (task: Task) => {
  return (dispatch: Dispatch) => {
    nSQL("todos").query("upsert",
      [
        task
      ])
    .exec().then((updatedRows: Task[]) => {
      dispatch(createdTask(updatedRows[0].taskId))
      }).catch((e) => {
        dispatch(fetchingAllTasksFailure(e));
      })
  }
}

const initialTodoState = {
    isFetching: false
}

export const TaskActions = (state = initialTodoState, action: AnyAction) => {
  switch (action.type) {
    case FETCHING_TASK :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_TASK_SUCCESS :
      return {
        ...state,
        isFetching: false,
        task: action.task,
        taskId: action.task.taskId
      }
    case FETCHING_ALL_TASKS : 
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_ALL_TASKS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        tasks: action.tasks
      }
    case UPDATED_TASK :
      return {
        ...state,
        task: action.task,
        updatedTaskId: action.taskId
      }
    case CREATED_TASK :
      return {
        ...state,
        createdTaskId: action.taskId
      }
    default :
      return state
  }
}