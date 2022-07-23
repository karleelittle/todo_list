import './App.css';
import React, { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0){
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }

    setTodos([...todos, todoItem]);
    setNewTodo("");
  }
  const handleTodoDelete = (deleteIndex) => {
    const filteredTodos = todos.filter((_todo, i) => {
      return i !== deleteIndex;
    });

    setTodos(filteredTodos);
  }

  const handleTodoComplete = (index) => {
    const updatedTodos =todos.map((todo, i) => {
      if (index === i) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div style={{textAlign: "center"}}>
      <form onSubmit={(event) => {
      handleNewTodoSubmit(event);
      }}>
        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }} type="text"
        value={newTodo} />
        <div>
          <button>Add New Todo</button>
        </div>
      </form>
      <hr />
      {todos.map((todo, i) => {

        const todoClasses = [];
        if (todo.complete) {
          todoClasses.push("line-through");
        }

          return ( 
          <div key={i}>
            <span className={todoClasses.join(" ")}>{todo.text} </span>
            <button onClick={(event) => {
            handleTodoDelete(i);
            }}>Delete</button>
            <input onChange={(event) => {
              handleTodoComplete(i);
            }} checked={todo.complete} type="checkbox" />
          </div>
          );
      })}

    </div>
  );
}

export default App;
