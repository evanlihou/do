import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Routes } from "./components";
import { TaskActions } from "./redux/modules/tasks/tasks";
import "normalize.css";
import "./styles/globalStyles.scss";
import "roboto-fontface";
import { nSQL } from "@nano-sql/core";
import { TaskDbModel, Task } from "./models/task";

// Initialize DB
nSQL()
  .createDatabase({
    id: "tasks",
    mode: "PERM",
    tables: [
      TaskDbModel
    ],
    version: 1 // current schema/database version
  })
  .then(() => {
    console.log("Database initialized");
    const store = createStore(TaskActions, applyMiddleware(thunk));
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      document.getElementById("app")
    );
  })
  .catch(() => {
    // ran into a problem
    alert("Failed to initialize database.");
  });
