// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    //fetching the todo data from the server side using axios
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    // check whether is iput box empty or not
    if (newTodo.trim() === '') {
      alert('Todo cannot be blank!');
      return;
    }
    // Dummy POST request to add a new todo
    axios.post(API_URL, { userId: 1, title: newTodo, completed: false })
      .then(response => setTodos([response.data, ...todos]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');
  };

  const updateTodo = (id, completed) => {
    // Dummy PUT request to update a todo
    axios.put(`${API_URL}/${id}`, { completed })
      .then(response => {
        // Update the completed status without removing the task
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed } : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
    console.log("id", id);
  };

  const deleteTodo = (id) => {
    // Dummy DELETE request to delete a todo
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button style={{ marginLeft: '10px' }} onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              style={{ cursor: 'pointer' }}
              onChange={() => updateTodo(todo.id, !todo.completed)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
