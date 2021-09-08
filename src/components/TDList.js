import React, { useState } from 'react';
import TD from './TD';
import TDForm from './TDForm';

function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('list_todos')) || []
  );

  const saveToStorage = (todos) => {
    localStorage.setItem('list_todos', JSON.stringify(todos));
  };

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos, todo];

    setTodos(newTodos);
    saveToStorage(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((previous) =>
      previous.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
    saveToStorage(removeArr);
  };

  const completeTodo = (id) => {
    let completedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(completedTodos);
    saveToStorage(completedTodos);
  };

  return (
    <>
      <h1>To-Do List</h1>
      <TDForm onSubmit={addTodo} />
      <TD
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
