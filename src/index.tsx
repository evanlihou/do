
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Routes }  from "./components";
// import { users } from "./redux/modules/users/users"
import { TaskActions } from "./redux/modules/tasks/tasks"
import "normalize.css";
import "./styles/globalStyles.scss";
import "roboto-fontface"
import { nSQL } from "@nano-sql/core";
import {TaskDbModel, Task} from "./models/task"

// Initialize DB
nSQL().createDatabase({
    id: "tasks", // can be anything that's a string
    mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
    tables: [ // tables can be created as part of createDatabase or created later with create table queries
        TaskDbModel
    ],
    version: 1, // current schema/database version
    
}).then(() => {
    console.log("Database initialized");
    const store = createStore(TaskActions, applyMiddleware(thunk));
    ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById("app")
    );
}).catch(() => {
    // ran into a problem
})
