import { Helmet } from "react-helmet";
import "./App.css";
import TodoList from "./pages/TodoList";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Fungtech - Todo List</title>
        <link rel="icon" href="/new-favicon.ico" />
      </Helmet>
      <TodoList />
    </React.Fragment>
  );
}

export default App;
