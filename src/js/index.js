import React from "react";
import ReactDOM from "react-dom";

import "../styles/index.css";
import "../styles/todoCard.css";

import TodoList from "./component/Todo.jsx";


// Render the TodoList component in the DOM
ReactDOM.render(<TodoList />, document.querySelector("#app"));