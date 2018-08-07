import React from "react";
import Home from "./components/Home";
import UsersList, { loadData } from "./components/UsersList";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/users",
    component: UsersList,
    loadData
  }
];
