import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(todoText) {
    const newTodo = { id: Date.now(), text: todoText };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function handleRemoveTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container ">
      <div className="heading">
        {" "}
        <h1>Todo App</h1>
      </div>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onRemoveTodo={handleRemoveTodo} />
    </div>
  );
}

function TodoForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (todoText.trim() === "") return;
    onAddTodo(todoText);
    setTodoText("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">
        {" "}
        <span> Add </span>
      </button>
    </form>
  );
}

function TodoList({ todos, onRemoveTodo }) {
  function handleClick(id) {
    onRemoveTodo(id);
  }

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => handleClick(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ol>
  );
}

export default App;
