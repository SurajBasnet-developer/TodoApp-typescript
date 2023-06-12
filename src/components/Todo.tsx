import React, { useState } from "react";
import './styles.css';

type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Learn TypeScript", isCompleted: true },
  { id: 2, text: "Build a React app", isCompleted: false },
];

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), isCompleted: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1 className="heading">Todo List</h1>
      <form onSubmit={addTodo} className="input">
        <input className="input_box"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.isCompleted ? "completed" : ""}>
              {todo.text}
            </span>
            <button  onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
