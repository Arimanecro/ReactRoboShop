import React from "react";
import ReactDOM from "react-dom";
import Project from "./components/project";
import { BrowserRouter } from "react-router-dom";
import '../public/css/styles.css';
ReactDOM.render(
  <BrowserRouter>
    <Project />
  </BrowserRouter>,
  document.getElementById("root")
);
